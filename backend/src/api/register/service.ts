import { Request } from 'express';
import RegisterPayLoad from './RegisterPayLoad';
import { User, UserCode } from '../../databases/models';
import RoleCodes from '../../utils/constants/RoleCode';
import ResponeCodes from '../../utils/constants/ResponeCode';
import { sendRegisterEmail } from '../../utils/helpers/email';
import sequelize from '../../databases';
import { generateCode, generateToken } from '../../utils/helpers/generate';

const checkEmail = async (req: Request) => {
	try {
		let data: boolean;
		let message: string;
		let status: number;
		const email = req.body.email;
		if (!email) {
			data = false;
			message = 'Invalid email';
			status = ResponeCodes.BAD_REQUEST;
		} else {
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
	try {
		let data;
		let message: string;
		let status: number;
		const email = req.body.email;

		const { code, expires } = generateCode();
		await UserCode.create({
			email,
			code,
			expires
		});
		sendRegisterEmail(email, code);

		data = email;
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
	try {
		let data: boolean;
		let message: string;
		let status: number;
		const { email, code } = req.body;

		if (!email || !code) {
			data = false;
			message = 'Invalid email or code';
			status = ResponeCodes.BAD_REQUEST;
		} else {
			const registerUser = await UserCode.findOne({
				where: {
					code,
					email
				}
			});

			if (!registerUser) {
				data = false;
				message = 'Incorrect code!';
				status = ResponeCodes.OK;
			} else {
				if (registerUser.expires < new Date(Date.now())) {
					data = false;
					message = 'Expired code!';
					status = ResponeCodes.OK;
				} else {
					data = true;
					message = 'Verify code successfully!';
					status = ResponeCodes.OK;
				}
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
	try {
		let data;
		let message: string;
		let status: number;
		const newUser: RegisterPayLoad = req.body;
		if (!newUser.email || !newUser.password) {
			data = null;
			message = 'Invalid email or password';
			status = ResponeCodes.BAD_REQUEST;
		} else {
			const transaction = await sequelize.transaction(async t => {
				const user = await User.create(newUser, { transaction: t });
				await user.setRoles([RoleCodes.CUSTOMER], { transaction: t });
				const roleIds = [RoleCodes.CUSTOMER];
				const token = generateToken(user.id, roleIds, user.email);

				data = {
					user,
					token
				};
				message = 'Register successfully!';
				status = ResponeCodes.CREATED;
			});
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

export { register, sendCode, verifyCode, checkEmail };
