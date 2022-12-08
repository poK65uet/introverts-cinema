import { Request, Response } from 'express';
import * as service from './service';
import { ApiResponse } from 'utils/rest/ApiResponse';
import ResponeCodes from 'utils/constants/ResponeCode';

const createBill = async (req: Request, res: Response) => {
	try {
		const result = await service.createBill(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't create bill.", ResponeCodes.ERROR).send(res);
	}
};

const cancelBill = async (req: Request, res: Response) => {
	try {
		const result = await service.cancelBill(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't cancel bill.", ResponeCodes.ERROR).send(res);
	}
};

const verifyPayment = async (req: Request, res: Response) => {
	try {
		const result = await service.verifyBillPayment(req);
		const { data, message, status } = result;
		return new ApiResponse(data, message, status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't verify payment.", ResponeCodes.ERROR).send(res);
	}
};

export { createBill, cancelBill, verifyPayment };
