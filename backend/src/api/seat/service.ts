import { MAX_PAY_TIME } from 'api/bill/service';
import { Showtime } from 'databases/models';
import Seat, { SeatModel } from 'databases/models/Seat';
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

		data = await updateSeatStatus(seatList);
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

const updateSeatStatus = async (seatList: SeatModel[]) => {
	return await Promise.all(
		seatList.map(async seat => {
			if (
				seat.status === SeatStatus.BOOKING &&
				timeDiffToMinute(seat.updatedAt, new Date(Date.now())) > MAX_PAY_TIME
			) {
				await seat.update({
					status: SeatStatus.UN_BOOKED
				});
			}
			return seat;
		})
	);
};

export { getAllSeatByShowtime };
