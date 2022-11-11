import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config';
import LoginPayLoad from './LoginPayload';
import { Role, User } from 'databases/models';
import ResponeCodes from 'utils/constant/ResponeCode';

const verifyEmail = async (email: string) => {
	const user = await User.findOne({
		where: {
			email
		},
		include: Role
	});
	return user;
};

const login = async (loginData: LoginPayLoad) => {
	let data;
	let message: string;
	let status: number;
	const { email, password } = loginData;

	const user = await verifyEmail(email);

	if (user) {
		const verifyPassword = bcrypt.compareSync(password, user.password);
		if (!verifyPassword) {
			data = null;
			message = 'Wrong password!';
			status = ResponeCodes.OK;
		} else {
			const roles = user.Roles;

			const roleIds = roles.map(role => role.id);

			const token = jwt.sign({ userId: user.id, roleIds }, config.secret_key, {
				expiresIn: config.expires_in
			});

			data = {
				user,
				token
			};
			message = 'Login successfully!';
			status = ResponeCodes.OK;
		}
	} else {
		data = null;
		message = 'Invalid email!';
		status = ResponeCodes.OK;
	}

	return {
		data,
		message,
		status
	};
};

export { login };
