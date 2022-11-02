import { NextFunction, Request, Response } from 'express';
import * as service from './service';
import { ApiResponse } from 'utils/rest/ApiResponse';

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
	const result = await service.getAll();
	new ApiResponse(result).send(res);
};

const addUser = async (req: Request, res: Response, next: NextFunction) => {
	const newUser = req.body;
	const result = await service.addUser(newUser);
	new ApiResponse(result).send(res);
};

export { getUsers, addUser };
