import { Showtime } from 'databases/models';
import Seat, { SeatModel } from 'databases/models/Seat';
import { Request } from 'express';
import ResponeCodes from 'utils/constants/ResponeCode';
import SeatStatus from 'utils/constants/SeatStatus';
import { timeDiffToMinute } from 'utils/helpers/timeService';
import { PositionPayload } from './PositionPayload';

const upsertSeatByBooking = async (listPos: PositionPayload[]) => {};

const getAllSeatByShowtime = async (showtimeId: number) => {
	try {
		let data;
		let message: string;
		let status: number;
		const seatList = await Seat.findAll({
			include: [
				{
					model: Showtime,
					attributes: [],
					where: {
						id: showtimeId
					}
				}
			]
		});

		data = statusMapping(seatList);
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

const statusMapping = (seatList: SeatModel[]) => {
	return seatList.map(seat => {
		if (seat.status === SeatStatus.BOOKING && timeDiffToMinute(seat.updatedAt, new Date(Date.now())) > 15) {
			seat.status = SeatStatus.UN_BOOKED;
		}
		return seat;
	});
};

export { getAllSeatByShowtime };
