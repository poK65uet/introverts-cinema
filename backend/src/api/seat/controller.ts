import { Request, Response } from 'express';
import * as service from './service';
import { ApiResponse } from 'utils/rest/ApiResponse';
import ResponeCodes from 'utils/constant/ResponeCode';

const getAllSeat = async (req: Request, res: Response) => {
	try {
		const showtimeId = parseInt(req.query.showtime as string);

		if (isNaN(showtimeId)) {
			return new ApiResponse(null, 'Showtime invalid.', ResponeCodes.BAD_REQUEST).send(res);
		}
		const result = await service.getAllSeatByShowtime(showtimeId);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't get showtime.", ResponeCodes.ERROR).send(res);
	}
};

export { getAllSeat };
