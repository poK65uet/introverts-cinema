import { Request } from 'express';
import { Bill, Film, Room, Seat } from 'databases/models';
import { SeatModel } from 'databases/models/Seat';
import BillPayload from './BillPayload';
import sequelize from 'databases';
import User, { UserModel } from 'databases/models/User';
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
const MAX_PAY_TIME = 15; //minutes

const createBill = async (req: Request) => {
	const payload: BillPayload = req.body;
	const t = await sequelize.transaction();
	const user: UserModel = req.user;
	try {
		const showtime: ShowtimeModel = await Showtime.findByPk(payload.showtimeId, {
			include: {
				model: Room
			}
		});
		console.log();

		if (!showtime) {
			return {
				message: 'Showtime invalid',
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
				where: {
					code: pos.code
				},
				include: [
					{
						model: Showtime,
						attributes: [],
						where: {
							id: showtime.id
						}
					}
				]
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
					t.rollback();
					return {
						message: '1 seat invalid!',
						status: ResponeCodes.BAD_REQUEST
					};
				}
			}
			console.log(1);

			seatList.push(seat);
			const price = await getPrice(showtime.Room.visionType, showtime.startTime.getDay());
			totalPrice += price.value;
		}
		const bill = await Bill.create({
			totalPrice,
			paymentStatus: PaymentStatus.UNPAID
		});
		await bill.setShowtime(showtime);

		await bill.setUser(user);
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

const cancelBill = async (req: Request) => {
	const billId: number = req.body.bill;
	const bill: BillModel = await Bill.findByPk(billId, {
		include: [
			{
				model: Seat
			},
			{
				model: User
			}
		]
	});

	if (!bill) {
		return {
			message: 'Bill invalid',
			status: ResponeCodes.BAD_REQUEST
		};
	}
	if (bill.User.id !== req.user.id) {
		return {
			message: 'Error Authorization',
			status: ResponeCodes.BAD_REQUEST
		};
	}

	for (let seat of bill.Seats) {
		await seat.update({
			status: SeatStatus.UN_BOOKED
		});
	}

	return {
		data: 0,
		message: 'Succesfully',
		status: ResponeCodes.OK
	};
};

const confirmPayment = async (req: Request) => {};

const verifySeat = (seat: SeatModel, user: UserModel) => {
	if (!seat) return false;
	if (seat.status === SeatStatus.BOOKED) return false;
	if (
		seat.status === SeatStatus.BOOKING &&
		seat.owner != null &&
		seat.owner != user.email &&
		timeDiffToMinute(new Date(Date.now()), seat.updatedAt) < MAX_PAY_TIME
	)
		return false;
	return true;
};

const createQrCode = (bill: BillModel) => {
	return `${config.qr_code_base_url}?amount=${bill.totalPrice}&addInfo=${bill.id}`;
};

export { createBill, cancelBill };
