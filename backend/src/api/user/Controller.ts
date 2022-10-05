import { NextFunction, Request, Response } from 'express';
import * as service from './Service';
import { ApiResponse } from 'utils/rest/ApiResponse';

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
	const result = await service.getAll();
	new ApiResponse(result).send(res);
};

export { getUsers };
