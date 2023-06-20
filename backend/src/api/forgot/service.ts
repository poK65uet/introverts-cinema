import { User, UserCode } from '../../databases/models';
import { Request } from 'express';
import bcrypt from 'bcrypt';
import ResponeCodes from '../../utils/constants/ResponeCode';
import { sendForgotEmail } from '../../utils/helpers/email';
import { generateCode } from '../../utils/helpers/generate';

const checkEmail = async (req: Request) => {
	try {
		let data: boolean;
		let message: string;
		let status: number;

		const email = req.body.email;

		if (!email) {
			data = false;
			message = 'Email null.';
			status = ResponeCodes.BAD_REQUEST;
		} else {
			const user = await User.findOne({
				where: {
					email
				}
			});
			if (!user) {
				data = false;
				message = 'User not exsist.';
				status = ResponeCodes.OK;
			} else {
				data = true;
				message = 'Check successfully!';
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
		sendForgotEmail(email, code);

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
			const forgottenUser = await UserCode.findOne({
				where: {
					email,
					code
				}
			});
			if (!forgottenUser) {
				data = false;
				message = 'Incorrect code!';
				status = ResponeCodes.OK;
			} else {
				if (forgottenUser.expires < new Date(Date.now())) {
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

const resetPassword = async (req: Request) => {
	try {
		let data;
		let message: string;
		let status: number;

		const { email, password } = req.body;

		if (!email || !password) {
			data = null;
			message = 'Invalid email or password';
			status = ResponeCodes.BAD_REQUEST;
		} else {
			const newPassword = bcrypt.hashSync(password, 10);
			data = await User.update(
				{
					password: newPassword
				},
				{
					where: {
						email
					}
				}
			);
			message = 'Reset password successfully!';
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

export { checkEmail, sendCode, verifyCode, resetPassword };
