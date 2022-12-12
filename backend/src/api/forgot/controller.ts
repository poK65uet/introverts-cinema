import { Request, Response } from 'express';
import ResponeCodes from 'utils/constants/ResponeCode';
import { ApiResponse } from 'utils/rest/ApiResponse';
import * as service from './service';

const sendCode = async (req: Request, res: Response) => {
	try {
		const checkResult = await service.checkEmail(req);
		if (checkResult.data) {
			const result = await service.sendCode(req);
			const { data, message, status } = result;
			return new ApiResponse(data, message, status).send(res);
		} else {
			const { data, message, status } = checkResult;
			return new ApiResponse(data, message, status).send(res);
		}
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't send code.", ResponeCodes.ERROR).send(res);
	}
};

const resetPassword = async (req: Request, res: Response) => {
	try {
		const verifyResult = await service.verifyCode(req);
		if (verifyResult.data) {
			const result = await service.resetPassword(req);
			const { data, message, status } = result;
			return new ApiResponse(data, message, status).send(res);
		} else {
			const { data, message, status } = verifyResult;
			return new ApiResponse(data, message, status).send(res);
		}
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't reset password.", ResponeCodes.ERROR).send(res);
	}
};

export { sendCode, resetPassword };
