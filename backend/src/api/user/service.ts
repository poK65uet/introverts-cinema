import bcrypt from 'bcrypt';
import { Request } from 'express';
import { User } from 'databases/models';
import { UserModel } from 'databases/models/IModel';
import ResponeCodes from 'utils/constants/ResponeCode';
import UserPayload from './UserPayload';
import UserInfo from './UserInfo';
import paginate from 'utils/helpers/pagination';
import { Op } from 'sequelize';
import sequelize from 'databases';

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

		const { email, password, roles } = newUser;
		if (!email || !password) {
			data = null;
			message = 'Email or password null.';
			status = ResponeCodes.BAD_REQUEST;
		} else {
			const transaction = await sequelize.transaction(async t => {
				const [user, created] = await User.findOrCreate({
					where: {
						email
					},
					defaults: {
						...newUser
					},
					transaction: t
				});

				if (created) {
					await user.setRoles(roles, { transaction: t });
					data = user;
					message = 'Add user successfully!';
					status = ResponeCodes.CREATED;
				} else {
					data = null;
					message = 'Email exists.';
					status = ResponeCodes.OK;
				}
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

const getMe = async (req: Request) => {
	try {
		let data;
		let message: string;
		let status: number;

		const id = req.user.id;

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

		return {
			data,
			message,
			status
		};
	} catch (error) {
		throw error;
	}
};

const changeInfo = async (req: Request) => {
	try {
		let data;
		let message: string;
		let status: number;

		const id = req.user.id;

		const info: UserInfo = req.body;
		data = await User.update(
			{
				fullName: info.fullName,
				phone: info.phone,
				birthDay: info.birthDay
			},
			{
				where: {
					id
				}
			}
		);
		message = 'Update user successfully!';
		status = ResponeCodes.OK;

		return {
			data,
			message,
			status
		};
	} catch (error) {
		throw error;
	}
};

const checkPassword = async (req: Request) => {
	try {
		let data;
		let message: string;
		let status: number;
		const id = req.user.id;
		const newPassword = req.body.password;

		const user = await User.findByPk(id);
		const duplicate = bcrypt.compareSync(newPassword, user.password);

		data = !duplicate;
		message = duplicate ? 'Duplicate password' : 'OK';
		status = ResponeCodes.OK;

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

		const id = req.user.id;

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

export { getUsers, getUserById, addUser, deleteUser, changeInfo, changePassword, checkPassword, getMe };
