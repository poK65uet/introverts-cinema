import { Request, Response } from 'express';
import { ApiResponse } from 'utils/rest/ApiResponse';
import * as service from './service';

// POST: /register/sendCode
const sendCode = async (req: Request, res: Response) => {
	const result = await service.sendCode(req);
	return new ApiResponse(result.data, result.message, result.status).send(res);
};

// POST: /register
const verifyAndRegister = async (req: Request, res: Response) => {
	const verifyResult = await service.verifyCode(req);
	console.log(verifyResult.data);
	if (verifyResult.data !== null) {
		const registerResult = await service.register(req);
		return new ApiResponse(registerResult.data, registerResult.message, registerResult.status).send(res);
	} else {
		return new ApiResponse(verifyResult.data, verifyResult.message, verifyResult.status).send(res);
	}
};

export { sendCode, verifyAndRegister };
