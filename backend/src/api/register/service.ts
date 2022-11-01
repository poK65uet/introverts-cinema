import jwt from 'jsonwebtoken';
import { User } from 'databases/models';
import RegisterPayLoad from './RegisterPayLoad';
import RoleCode from 'constant/Role';
import config from 'config';
import { UserModel } from 'databases/models/User';

interface RegisterResponse {
	user: UserModel;
	token: string;
}

const register = async (newUser: RegisterPayLoad) => {
	let data: RegisterResponse;
	let message: string;
	let status: number;

	try {
		const user = await User.create(newUser);
		const roles = await user.getRoles();
		const roleIds =  roles.map((role) => role.id);

		const token = jwt.sign({ userId: user.id, roleIds }, config.secret_key, {
			expiresIn: config.expires_in
		});

		data = {
			user,
			token
		};
		message = 'Register successfully!';
		status = 200;
	} catch (error) {
		data = null;
		message = 'Email exists!';
		status = 401;
	}

	return {
		data,
		message,
		status
	};
};

export { register };
