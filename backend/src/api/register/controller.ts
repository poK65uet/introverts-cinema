import { Request, Response } from 'express';
import ResponeCodes from 'utils/constants/ResponeCode';
import { ApiResponse } from 'utils/rest/ApiResponse';
import * as service from './service';

// POST: /register/checkEmail
const checkEmail = async (req: Request, res: Response) => {
	try {
		const result = await service.checkEmail(req);
		return new ApiResponse(result.data, result.message, result.status).send(res);
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't check email.", ResponeCodes.ERROR).send(res);
	}
};

// POST: /register/sendCode
const sendCode = async (req: Request, res: Response) => {
	try {
		const checkEmailResult = await service.checkEmail(req);
		if (checkEmailResult.data) {
			const sendCodeResult = await service.sendCode(req);
			return new ApiResponse(sendCodeResult.data, sendCodeResult.message, sendCodeResult.status).send(res);
		} else {
			return new ApiResponse(checkEmailResult.data, checkEmailResult.message, checkEmailResult.status).send(res);
		}
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't send code.", ResponeCodes.ERROR).send(res);
	}
};

// POST: /register
const verifyAndRegister = async (req: Request, res: Response) => {
	try {
		const verifyResult = await service.verifyCode(req);
		if (verifyResult.data) {
			const checkEmailResult = await service.checkEmail(req);
			if (checkEmailResult.data) {
				const registerResult = await service.register(req);
				return new ApiResponse(registerResult.data, registerResult.message, registerResult.status).send(res);
			} else {
				return new ApiResponse(checkEmailResult.data, checkEmailResult.message, checkEmailResult.status).send(
					res
				);
			}
		} else {
			return new ApiResponse(verifyResult.data, verifyResult.message, verifyResult.status).send(res);
		}
	} catch (error) {
		return new ApiResponse(error.message, "Couldn't register.", ResponeCodes.ERROR).send(res);
	}
};

export { checkEmail, sendCode, verifyAndRegister };
