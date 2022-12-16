import { Request } from 'express';
import { Bill, Film, Room, Seat, Ticket } from 'databases/models';
import { SeatModel } from 'databases/models/Seat';
import BillPayload from './BillPayload';
import sequelize from 'databases';
import User, { UserModel } from 'databases/models/User';
import Showtime, { ShowtimeModel } from 'databases/models/Showtime';
import SeatStatus from 'utils/constants/SeatStatus';
import { timeDiffToMinute } from 'utils/helpers/timeService';
import ResponeCodes from 'utils/constants/ResponeCode';
import { getPrice } from 'api/price/service';
import PaymentStatus from 'utils/constants/PaymentStatus';
import { BillModel } from 'databases/models/Bill';
import config from 'config';
import { DESCRIPTION_PREFIX, getBillCodeById, verifyBillTransaction } from 'api/transaction/service';
import { Transaction } from 'sequelize';
import Status from 'utils/constants/Status';

const MAX_SEAT = 10;
export const MAX_PAY_TIME = 15; //minutes

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

		if (!showtime) {
			t.commit();
			return {
				message: 'Showtime invalid',
				status: ResponeCodes.BAD_REQUEST
			};
		}
		var totalPrice = 0;
		if (payload.seats.length > MAX_SEAT) {
			t.commit();
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
					await seat.update({
						owner: user.email,
						status: SeatStatus.BOOKING
					});
				} else {
					t.rollback();
					return {
						message: 'Seats invalid!',
						status: ResponeCodes.BAD_REQUEST
					};
				}
			}

			seatList.push(seat);
			const price = await getPrice(showtime);
			totalPrice += price;
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
	const t = await sequelize.transaction();
	try {
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

		if (!bill || bill.paymentStatus === PaymentStatus.PAID) {
			t.commit();
			return {
				message: 'Bill invalid',
				status: ResponeCodes.BAD_REQUEST
			};
		}
		if (bill.User.id !== req.user.id) {
			t.commit();
			return {
				message: 'Error Authorization',
				status: ResponeCodes.BAD_REQUEST
			};
		}

		for (let seat of bill.Seats) {
			if (seat.status === SeatStatus.BOOKING) {
				await seat.update(
					{
						status: SeatStatus.UN_BOOKED
					},
					{ transaction: t }
				);
			}
		}

		bill.update({
			paymentStatus: PaymentStatus.PAID
		});

		t.commit();
		return {
			data: 0,
			message: 'Succesfully',
			status: ResponeCodes.OK
		};
	} catch (error) {
		t.rollback();
		throw error;
	}
};

const verifyBillPayment = async (req: Request) => {
	const t = await sequelize.transaction();
	try {
		const billId: number = req.body.bill;
		const user: UserModel = req.user;
		const bill: BillModel = await Bill.findByPk(billId, {
			include: [
				{
					model: Seat
				},
				{
					model: User
				},
				{
					model: Showtime,
					include: [
						{
							model: Room
						},
						{
							model: Film
						}
					]
				}
			]
		});
		if (!bill) {
			t.commit();
			return {
				message: 'Bill invalid!',
				status: ResponeCodes.BAD_REQUEST
			};
		}

		if (bill.User.id !== req.user.id) {
			t.commit();
			return {
				message: 'Error Authorization',
				status: ResponeCodes.BAD_REQUEST
			};
		}

		if (bill.paymentStatus === PaymentStatus.PAID) {
			t.commit();
			return {
				message: 'Payment had been paid',
				status: ResponeCodes.BAD_REQUEST
			};
		}

		const startTime = new Date(Date.now());
		let isPaid = false;
		while (timeDiffToMinute(new Date(Date.now()), startTime) <= 0.3) {
			isPaid = await verifyBillTransaction(bill);
			if (isPaid) {
				await bill.update(
					{
						paymentStatus: PaymentStatus.PAID
					},
					{ transaction: t }
				);

				await createTicketForBill(bill, t);
				break;
			}
		}
		t.commit();
		if (isPaid) {
			return {
				data: true,
				message: 'Successfully',
				status: ResponeCodes.OK
			};
		} else {
			return {
				data: false,
				message: `Not found payment`,
				status: ResponeCodes.OK
			};
		}
	} catch (error) {
		t.rollback();
		throw error;
	}
};

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
	return `${config.qr_code_base_url}?amount=${bill.totalPrice}&addInfo=${DESCRIPTION_PREFIX.replace(
		/ /g,
		'%20'
	)}${getBillCodeById(bill.id)}`;
};

const createTicketForBill = async (bill: BillModel, t: Transaction) => {
	for (let seat of bill.Seats) {
		if (!verifySeat(seat, bill.User)) throw new Error('Payment Bill invalid!');
		await seat.update(
			{
				status: SeatStatus.BOOKED
			},
			{ transaction: t }
		);

		const price = await getPrice(bill.Showtime);
		const ticket = await Ticket.create(
			{
				seatRow: seat.row,
				seatColumn: seat.column,
				seatCode: seat.code,
				time: bill.Showtime.startTime,
				price,
				room: bill.Showtime.Room.name,
				status: Status.ACTIVE
			},
			{ transaction: t }
		);
		await ticket.setUser(bill.User, { transaction: t });
		await ticket.setFilm(bill.Showtime.Film, { transaction: t });
	}
};

export { createBill, cancelBill, verifyBillPayment };
