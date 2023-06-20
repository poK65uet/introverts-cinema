import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../utils/rest/ApiResponse';
import jwt from 'jsonwebtoken';
import config from '../config';
import RoleCodes from '../utils/constants/RoleCode';
import ResponeCodes from '../utils/constants/ResponeCode';
import User, { UserModel } from '../databases/models/User';
import { Role } from '../databases/models';

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

	jwt.verify(token, config.secret_key, async (err: Error, decoded: IToken) => {
		if (err) {
			return new ApiResponse(err, 'Unauthorized!', ResponeCodes.UNAUTHORIZED).send(res);
		}
		req.user = await User.findByPk(decoded.userId, {
			include: [
				{
					model: Role,
					through: {
						attributes: []
					}
				}
			]
		});
		if (!req.user) {
			return new ApiResponse(err, 'Unauthorized!', ResponeCodes.UNAUTHORIZED).send(res);
		}
		next();
	});
};

const verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {
	const user: UserModel = req.user;
	const roleIds = user.Roles.map(role => role.id);

	if (!roleIds.includes(RoleCodes.ADMIN)) {
		return new ApiResponse(null, 'Not permission!', ResponeCodes.UNAUTHORIZED).send(res);
	}
	next();
};

const verifyCustomer = async (req: Request, res: Response, next: NextFunction) => {
	const user: UserModel = req.user;
	const roleIds = user.Roles.map(role => role.id);

	if (!roleIds.includes(RoleCodes.CUSTOMER)) {
		return new ApiResponse(null, 'Not permission!', ResponeCodes.UNAUTHORIZED).send(res);
	}
	next();
};

export { verifyToken, verifyAdmin, verifyCustomer };
