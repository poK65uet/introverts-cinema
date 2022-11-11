import jwt from 'jsonwebtoken';
import config from 'config';
import { Request } from 'express';
import RegisterPayLoad from './RegisterPayLoad';
import { User, UserCode } from 'databases/models';
import RoleCodes from 'utils/constant/RoleCode';
import ResponeCodes from 'utils/constant/ResponeCode';
import { sendEmail } from 'utils/email';
import { UserCodeModel } from 'databases/models/UserCode';

const generateCode = () => {
	const code = `${Math.floor(100000 + Math.random() * 900000)}`;
	return code;
};

const sendCode = async (req: Request) => {
	let data;
	let message: string;
	let status: number;

	const email = req.body.email;
	const user = await User.findOne({
		where: {
			email
		}
	});
	if (user) {
		message = 'Email exists!';
		status = ResponeCodes.OK;
	} else {
		const code = generateCode();
		await UserCode.create({
			email,
			code
		});
		await sendEmail(email, 'Verify your email address', code);
		message = 'Send code successfully!';
		status = ResponeCodes.CREATED;
	}

	return {
		data,
		message,
		status
	};
};

const verifyCode = async (req: Request) => {
	let data;
	let message: string;
	let status: number;

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
};

const register = async (req: Request) => {
	let data;
	let message: string;
	let status: number;

	const newUser: RegisterPayLoad = req.body;
	const { email, password, fullName, birthDay } = newUser;
	const [user, created] = await User.findOrCreate({
		where: {
			email
		},
		defaults: {
			password,
			fullName,
			birthDay
		}
	});

	if (created) {
		await user.addRole(RoleCodes.CUSTOMER);
		// const roles = await user.getRoles();
		const roleIds = [RoleCodes.CUSTOMER];

		const token = jwt.sign({ userId: user.id, roleIds }, config.secret_key, {
			expiresIn: config.expires_in
		});

		data = {
			user,
			token
		};
		message = 'Register successfully!';
		status = ResponeCodes.CREATED;
	} else {
		data = null;
		message = 'Email exists!';
		status = ResponeCodes.OK;
	}

	return {
		data,
		message,
		status
	};
};

export { register, sendCode, verifyCode };
