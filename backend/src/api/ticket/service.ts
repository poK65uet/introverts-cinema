import { Request } from 'express';
import ResponeCodes from 'utils/constants/ResponeCode';
import paginate from 'utils/helpers/pagination';
import { Op } from 'sequelize';
import { Film, Ticket, User } from 'databases/models';
import { create } from 'domain';
import { TicketModel } from 'databases/models/Ticket';
import Status from 'utils/constants/Status';
import { addTimeByMinute, timeDiffToMinute } from 'utils/helpers/timeService';

const getTickets = async (req: Request) => {
	try {
		const { limit, offset, order, query } = paginate(req);

		const tickets = await Ticket.findAndCountAll({
			include: {
				model: Film
			},
			where: {
				room: {
					[Op.like]: `%${query}%`
				}
			},
			limit,
			offset,
			order: [order]
		});

		tickets.rows = await updateTicketStatus(tickets.rows);
		return tickets;
	} catch (error) {
		throw error;
	}
};

const getMyTickets = async (req: Request) => {
	try {
		const id = req.user.id;

		const myTickets = await Ticket.findAll({
			include: [
				{
					model: User,
					attributes: [],
					where: {
						id
					}
				},
				{
					model: Film
				}
			],
			order: [['createdAt', 'DESC']]
		});
		const data = await updateTicketStatus(myTickets);
		return data;
	} catch (error) {
		throw error;
	}
};

const updateTicketStatus = async (ticketList: TicketModel[]) => {
	return await Promise.all(
		ticketList.map(async ticket => {
			if (
				ticket.status === Status.ACTIVE &&
				addTimeByMinute(ticket.time, ticket.Film.duration).getTime() < new Date(Date.now()).getTime()
			) {
				await ticket.update({
					status: Status.INACTIVE
				});
			}
			return ticket;
		})
	);
};

export { getTickets, getMyTickets };
