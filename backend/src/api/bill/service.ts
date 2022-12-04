import { Request } from 'express';
import { Bill, Film, Seat } from 'databases/models';
import { SeatModel } from 'databases/models/Seat';
import BillPayload, { Position } from './BillPayload';
import sequelize from 'databases';
import User, { UserModel } from 'databases/models/User';
import Showtime, { ShowtimeModel } from 'databases/models/Showtime';
import SeatStatus from 'utils/constant/SeatStatus';
import Minute from 'utils/constant/Minute';
import Price, { PriceModel } from 'databases/models/Price';

const createBill = async (req: Request) => {
	const payload: BillPayload = req.body;
	const t = await sequelize.transaction();
	try {
		const user: UserModel = await User.findByPk(payload.userId);
		const showtime: ShowtimeModel = await Showtime.findByPk(payload.showtimeId);
		const bill = await Bill.create();
		bill.setUser(user);
		bill.setShowtime(showtime);
		var totalPrice = 0;
		for (let pos of payload.positions) {
			const seat = await Seat.findOne({
				include: [
					{
						model: Film,
						attributes: [],
						where: {
							id: showtime.id
						}
					}
				],
				where: {
					row: pos.row,
					column: pos.column
				}
			});
			if (!seat) throw new Error('Seat invalid!');
			if (verifySeat(seat, user)) {
				seat.update({
					owner: user.email
				});
				bill.addSeat(seat);
				totalPrice += v;
			}
		}
	} catch (error) {
		t.rollback();
		throw error;
	}
};

const verifySeat = (seat: SeatModel, user: UserModel) => {
	if (!seat) return false;
	if (seat.status == SeatStatus.BOOKED) return false;
	if (seat.owner != null && seat.owner != user.email && Date.now() - seat.updatedAt.getTime() <= Minute.FIFTEENT)
		return false;
	return true;
};

const calculatePrice = async (showtime: ShowtimeModel) => {
	// const price: PriceModel = Price.findOne({
	//     where: {
	//         dayCode: showtime.startTime.getDay(),
	//         visionType: showtime.Room.visionType
	//     }
	// })
	return 10;
};
