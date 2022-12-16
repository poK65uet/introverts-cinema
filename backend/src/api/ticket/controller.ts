import { Request, Response } from 'express';
import * as service from './service';
import { ApiResponse } from 'utils/rest/ApiResponse';
import ResponeCodes from 'utils/constants/ResponeCode';

// GET: /tickets/pagination
const getTikets = async (req: Request, res: Response) => {
	try {
		const result = await service.getTickets(req);
		return new ApiResponse(result).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't get tickets.", ResponeCodes.ERROR).send(res);
	}
};

// GET: /tickets/me
const getMyTickets = async (req: Request, res: Response) => {
	try {
		const result = await service.getMyTickets(req);
		return new ApiResponse(result).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't get my tickets.", ResponeCodes.ERROR).send(res);
	}
};

export { getTikets, getMyTickets };
