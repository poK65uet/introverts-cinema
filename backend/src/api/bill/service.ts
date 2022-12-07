import { Request } from 'express';
import { Bill, Film, Room, Seat } from 'databases/models';
import { SeatModel } from 'databases/models/Seat';
import BillPayload from './BillPayload';
import sequelize from 'databases';
import User, { UserModel, UserRequestInfo } from 'databases/models/User';
import Showtime, { ShowtimeModel } from 'databases/models/Showtime';
import SeatStatus from 'utils/constants/SeatStatus';
import Price, { PriceModel } from 'databases/models/Price';
import { timeDiffToMinute } from 'utils/helpers/timeService';
import ResponeCodes from 'utils/constants/ResponeCode';
import { getPrice } from 'api/price/service';
import PaymentStatus from 'utils/constants/PaymentStatus';
import { BillModel } from 'databases/models/Bill';
import config from 'config';

const MAX_SEAT = 10;

const createBill = async (req: Request) => {
	const payload: BillPayload = req.body;
	const t = await sequelize.transaction();
	const user: UserRequestInfo = req.user;
	try {
		const showtime: ShowtimeModel = await Showtime.findByPk(payload.showtimeId, {
			include: {
				model: Room
			}
		});
		if (!user || !showtime) {
			return {
				message: 'user or showtime invalid',
				status: ResponeCodes.BAD_REQUEST
			};
		}
		var totalPrice = 0;
		if (payload.seats.length > MAX_SEAT) {
			return {
				message: 'Number of seats invalid',
				status: ResponeCodes.BAD_REQUEST
			};
		}
		let seatList = [];
		for (let pos of payload.seats) {
			let seat = await Seat.findOne({
				include: [
					{
						model: Showtime,
						attributes: [],
						where: {
							id: showtime.id
						}
					}
				],
				where: {
					code: pos.code
				}
			});
			if (!seat) {
				seat = await Seat.create({
					row: pos.row,
					column: pos.column,
					code: pos.code,
					owner: user.email,
					status: SeatStatus.BOOKING
				});
				await seat.setShowtime(showtime);
			} else {
				if (verifySeat(seat, user)) {
					seat.update({
						owner: user.email
					});
				} else {
					return {
						message: '1 seat invalid!',
						status: ResponeCodes.BAD_REQUEST
					};
				}
			}
			seatList.push(seat);
			const price = await getPrice(showtime.Room.visionType, showtime.startTime.getDay());
			totalPrice += price.value;
		}
		const bill = await Bill.create({
			totalPrice,
			paymentStatus: PaymentStatus.UNPAID
		});
		await bill.setShowtime(showtime);
		const user_: UserModel = await User.findByPk(user.id);
		await bill.setUser(user_);
		for (let seat of seatList) {
			await bill.addSeat(seat);
		}
		await t.commit();

		return {
			data: {
				bill,
				qrCode: createQrCode(bill)
			},
			message: 'Succesfully',
			status: ResponeCodes.OK
		};
	} catch (error) {
		t.rollback();
		throw error;
	}
};

const verifySeat = (seat: SeatModel, user: UserRequestInfo) => {
	if (!seat) return false;
	if (seat.status === SeatStatus.BOOKED) return false;
	if (seat.owner != null && seat.owner != user.email && timeDiffToMinute(new Date(Date.now()), seat.updatedAt) < 15)
		return false;
	return true;
};

const createQrCode = (bill: BillModel) => {
	return `${config.qr_code_base_url}?amount=${bill.totalPrice}&addInfo=${bill.id}`;
};

export { createBill };
