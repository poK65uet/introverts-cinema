import jwt from 'jsonwebtoken';
import config from 'config';
import { Request } from 'express';
import RegisterPayLoad from './RegisterPayLoad';
import { User, UserCode } from 'databases/models';
import RoleCodes from 'utils/constant/RoleCode';
import ResponeCodes from 'utils/constant/ResponeCode';
import { sendEmail } from 'utils/email';
import { UserCodeModel } from 'databases/models/UserCode';
import { throws } from 'assert';

const generateCode = () => {
	const code = `${Math.floor(100000 + Math.random() * 900000)}`;
	return code;
};

function generateToken(userId: number, roleIds: number[]) {
	const token = jwt.sign({ userId, roleIds }, config.secret_key, {
		expiresIn: config.expires_in
	});
	return token;
}

const checkEmail = async (req: Request) => {
	let data: boolean;
	let message: string;
	let status: number;

	try {
		const email = req.body.email;
		const user = await User.findOne({
			where: {
				email
			}
		});
		if (user) {
			data = false;
			message = 'Email exists!';
			status = ResponeCodes.OK;
		} else {
			data = true;
			message = 'Email not exists!';
			status = ResponeCodes.OK;
		}

		return {
			data,
			message,
			status
		};
	} catch (error) {
		throw error;
	}
};

const sendCode = async (req: Request) => {
	let data;
	let message: string;
	let status: number;

	try {
		const email = req.body.email;
		const code = generateCode();
		await UserCode.create({
			email,
			code
		});
		await sendEmail(email, 'Verify your email address', code);
		message = 'Send code successfully!';
		status = ResponeCodes.CREATED;

		return {
			data,
			message,
			status
		};
	} catch (error) {
		throw error;
	}
};

const verifyCode = async (req: Request) => {
	let data;
	let message: string;
	let status: number;

	try {
		const { email, code } = req.body;

		const registerUser = await UserCode.findOne({
			where: {
				code,
				email
			}
		});

		if (!registerUser) {
			data = null;
			message = 'Incorrect code!';
			status = ResponeCodes.OK;
		} else {
			if (registerUser.expires < new Date(Date.now())) {
				data = null;
				message = 'Expired code!';
				status = ResponeCodes.OK;
			} else {
				data = registerUser;
				message = 'Verify code successfully!';
				status = ResponeCodes.OK;
			}
		}

		return {
			data,
			message,
			status
		};
	} catch (error) {
		throw error;
	}
};

const register = async (req: Request) => {
	let data;
	let message: string;
	let status: number;

	try {
		const newUser: RegisterPayLoad = req.body;
		const user = await User.create(newUser);

		await user.addRole(RoleCodes.CUSTOMER);
		// const roles = await user.getRoles();
		const roleIds = [RoleCodes.CUSTOMER];

		const token = generateToken(user.id, roleIds);

		data = {
			user,
			token
		};
		message = 'Register successfully!';
		status = ResponeCodes.CREATED;

		return {
			data,
			message,
			status
		};
	} catch (error) {
		throw error;
	}
};

export { register, sendCode, verifyCode, checkEmail };
