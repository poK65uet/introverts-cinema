import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from 'utils/rest/ApiResponse';
import jwt from 'jsonwebtoken';
import config from '../config';
import RoleCodes from 'utils/constants/RoleCode';
import ResponeCodes from 'utils/constants/ResponeCode';
import { UserRequestInfo } from 'databases/models/User';

interface IToken {
	userId: number;
	userEmail: string;
	roleIds: number[];
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
	// const token = (req.headers['x-access-token'] || req.headers['authorization']) as string;
	const token = req.header('Authorization')?.replace('Bearer ', '');

	if (!token) {
		return new ApiResponse(null, 'No token provided!', ResponeCodes.UNAUTHORIZED).send(res);
	}

	jwt.verify(token, config.secret_key, (err: Error, decoded: IToken) => {
		if (err) {
			return new ApiResponse(err, 'Unauthorized!', ResponeCodes.UNAUTHORIZED).send(res);
		}
		req.user = {
			id: decoded.userId,
			email: decoded.userEmail,
			roleIds: decoded.roleIds
		};
		next();
	});
};

const verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {
	const user: UserRequestInfo = req.user;
	if (!user || !user.roleIds.includes(RoleCodes.ADMIN)) {
		return new ApiResponse(null, 'Not permission!', ResponeCodes.UNAUTHORIZED).send(res);
	}
	next();
};

const verifyCustomer = async (req: Request, res: Response, next: NextFunction) => {
	const user: UserRequestInfo = req.user;
	console.log(user.roleIds);

	if (!user || !user.roleIds.includes(RoleCodes.CUSTOMER)) {
		return new ApiResponse(null, 'Not permission!', ResponeCodes.UNAUTHORIZED).send(res);
	}
	next();
};

export { verifyToken, verifyAdmin, verifyCustomer };
