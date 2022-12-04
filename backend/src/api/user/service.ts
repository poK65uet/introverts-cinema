import bcrypt from 'bcrypt';
import { Request } from 'express';
import { User } from 'databases/models';
import { UserModel } from 'databases/models/IModel';
import ResponeCodes from 'utils/constants/ResponeCode';
import UserPayload from './UserPayload';
import RoleCodes from 'utils/constants/RoleCode';
import UserInfo from './UserInfo';
import paginate from 'utils/helpers/pagination';
import { Op } from 'sequelize';

const getUsers = async (req: Request) => {
	try {
		const { limit, offset, order, query } = paginate(req);

		const users = await User.findAndCountAll({
			where: {
				[Op.or]: [
					{
						email: {
							[Op.like]: `%${query}%`
						}
					}, 
					{
						fullName: {
							[Op.like]: `%${query}%`
						}
					}
				]
			},
			limit,
			offset,
			order: [order]
		});
		return users;
	} catch (error) {
		throw error;
	}
};

const getUserById = async (req: Request) => {
	try {
		let data: UserModel | null;
		let message: string;
		let status: number;

		const id = parseInt(req.params.id);

		if (isNaN(id)) {
			data = null;
			message = 'Invalid identifier.';
			status = ResponeCodes.BAD_REQUEST;
		} else {
			const user = await User.findByPk(id);
			if (!user) {
				data = null;
				message = 'User not found.';
				status = ResponeCodes.NOT_FOUND;
			} else {
				data = user;
				message = 'Get successfully!';
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

const addUser = async (req: Request) => {
	try {
		let data;
		let message: string;
		let status: number;

		const newUser: UserPayload = req.body;

		const { email, password } = newUser;
		if (!email || !password) {
			data = null;
			message = 'Email or password null.';
			status = ResponeCodes.BAD_REQUEST;
		} else {
			const [user, created] = await User.findOrCreate({
				where: {
					email
				},
				defaults: {
					...newUser
				}
			});

			if (created) {
				await user.addRole(RoleCodes.CUSTOMER);
				data = user;
				message = 'Add user successfully!';
				status = ResponeCodes.CREATED;
			} else {
				data = null;
				message = 'Email exists.';
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

const updateUser = async (req: Request) => {
	try {
		let data;
		let message: string;
		let status: number;

		const id = parseInt(req.params.id);

		if (isNaN(id)) {
			data = null;
			message = 'Invalid user identifier.';
			status = ResponeCodes.BAD_REQUEST;
		} else {
			const info: UserInfo = req.body;
			data = await User.update(info, {
				where: {
					id
				}
			});
			message = 'Update user successfully!';
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

const changePassword = async (req: Request) => {
	try {
		let data;
		let message: string;
		let status: number;

		const id = parseInt(req.params.id);

		if (isNaN(id)) {
			data = null;
			message = 'Invalid user identifier.';
			status = ResponeCodes.BAD_REQUEST;
		} else {
			const password = bcrypt.hashSync(req.body.password, 10);
			data = await User.update(
				{
					password
				},
				{
					where: {
						id
					}
				}
			);
			message = 'Change password successfully!';
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

const deleteUser = async (req: Request) => {
	try {
		let data;
		let message: string;
		let status: number;

		const id = parseInt(req.params.id);

		if (isNaN(id)) {
			data = null;
			message = 'Invalid user identifier.';
			status = ResponeCodes.BAD_REQUEST;
		} else {
			data = await User.destroy({
				where: {
					id
				}
			});
			message = 'Delete user successfully!';
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

export { getUsers, getUserById, addUser, updateUser, deleteUser, changePassword };
