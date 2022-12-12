import { Request } from 'express';
import ResponeCodes from 'utils/constants/ResponeCode';
import paginate from 'utils/helpers/pagination';
import { Op } from 'sequelize';
import { Ticket, User } from 'databases/models';

const getTickets = async (req: Request) => {
	try {
		const { limit, offset, order, query } = paginate(req);

		const tickets = await Ticket.findAndCountAll({
			where: {
				room: {
					[Op.like]: `%${query}%`
				}
			},
			limit,
			offset,
			order: [order]
		});

		return tickets;
	} catch (error) {
		throw error;
	}
};

const getMyTickets = async (req: Request) => {
	try {
		let data;
		let message: string;
		let status: number;

		const id = req.user.id;

		const myTickets = await Ticket.findAll({
			include: {
				model: User,
				attributes: [],
				where: {
					id
				}
			}
		});

		data = myTickets;
		message = 'Get successfully!';
		status = ResponeCodes.OK;
		return {
			data,
			message,
			status
		};
	} catch (error) {
		throw error;
	}
};

export { getTickets, getMyTickets };
