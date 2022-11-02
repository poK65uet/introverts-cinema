import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from 'databases/models';
import LoginPayLoad from './LoginPayload';
import config from 'config';
import { UserModel } from 'databases/models/User';

interface LoginResponse {
	user: UserModel;
	token: string;
}

const verifyEmail = async (email: string) => {
	const user = await User.findOne({
		where: {
			email
		}
	});
	return user;
};

const login = async (loginData: LoginPayLoad) => {
	let data: LoginResponse;
	let message: string;
	let status: number;
	const { email, password } = loginData;

	const user = await verifyEmail(email);

	if (!user) {
		data = null;
		message = 'Invalid email!';
		status = 401;
	} else {
		const verifyPassword = bcrypt.compareSync(password, user.password);
		if (!verifyPassword) {
			data = null;
			message = 'Invalid password!';
			status = 401;
		} else {
			const roles = await user.getRoles();
			const roleIds = roles.map(role => role.id);

			const token = jwt.sign({ userId: user.id, roleIds }, config.secret_key, {
				expiresIn: config.expires_in
			});

			data = {
				user,
				token
			};
			message = 'Login successfully!';
			status = 200;
		}
	}

	return {
		data,
		message,
		status
	};
};

export { login };
