import config from '../../config';
import jwt from 'jsonwebtoken';
import { addTimeByMinute } from './timeService';

const generateCode = () => {
	const code = `${Math.floor(100000 + Math.random() * 900000)}`;
	const expires = addTimeByMinute(new Date(Date.now()), 30);
	return {
		code,
		expires
	};
};

const generateToken = (userId: number, roleIds: number[], userEmail: string) => {
	const token = jwt.sign({ userId, roleIds, userEmail }, config.secret_key, {
		expiresIn: config.expires_in
	});
	return token;
};

export { generateCode, generateToken };
