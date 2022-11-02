import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from 'utils/rest/ApiResponse';
import jwt from 'jsonwebtoken';
import config from '../config';
import RoleCode from 'constant/Role';

interface IToken {
	userId: number;
	roleIds: number[];
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
	// const token = (req.headers['x-access-token'] || req.headers['authorization']) as string;
	const token = req.header('Authorization')?.replace('Bearer ', '');

	if (!token) {
		return new ApiResponse(null, 'No token provided!', 403).send(res);
	}

	jwt.verify(token, config.secret_key, (err: Error, decoded: IToken) => {
		if (err) {
			return new ApiResponse(err, 'Unauthorized!', 401).send(res);
		}
		req.body.user = decoded;
		next();
	});
};

const verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {
	const user: IToken = req.body.user;
	if (!user || !user.roleIds.includes(RoleCode.Admin)) {
		return new ApiResponse(null, 'Not permission!', 401).send(res);
	}
	next();
};

const verifyCustomer = async (req: Request, res: Response, next: NextFunction) => {
	const user: IToken = req.body.user;
	if (!user || !user.roleIds.includes(RoleCode.Customer)) {
		return new ApiResponse(null, 'Not permission!', 401).send(res);
	}
	next();
};

export { verifyToken, verifyAdmin, verifyCustomer };
