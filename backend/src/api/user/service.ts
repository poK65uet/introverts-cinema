import { Request } from 'express';
import { Role, User } from 'databases/models';
import { UserModel } from 'databases/models/IModel';
import ResponeCodes from 'utils/constant/ResponeCode';
import UserPayload from './UserPayload';
import RoleCodes from 'utils/constant/RoleCode';

const getPagination = (page: string, size: string) => {
	const pageNumber = Number.parseInt(page);
	const sizeNumber = Number.parseInt(size);
	let limit = 10;
	let offset = 0;

	if (!Number.isNaN(sizeNumber) && sizeNumber > 0 && sizeNumber < 20) {
		limit = sizeNumber;
	}

	if (!Number.isNaN(pageNumber) && pageNumber > 0) {
		offset = pageNumber * limit;
	}

	return { limit, offset };
};

const getUsers = async (req: Request) => {
	try {
		const page = req.query.page as string;
		const size = req.query.size as string;
		const { limit, offset } = getPagination(page, size);
		const users = await User.findAndCountAll({
			limit,
			offset
		});
		return users;
	} catch (error) {
		throw error;
	}
};

const getUserById = async (req: Request<{ id: number }>) => {
	try {
		let data: UserModel | null;
		let message: string;
		let status: number;

		const id = req.params.id;

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

const updateUser = async (req: Request<{ id: number }>) => {
	try {
		let data;
		let message: string;
		let status: number;

		const id = req.params.id;

		if (isNaN(id)) {
			data = null;
			message = 'Invalid user identifier';
			status = ResponeCodes.BAD_REQUEST;
		} else {
			const updateUser: UserPayload = req.body;
			data = await User.update(updateUser, {
				where: {
					id
				},
				individualHooks: true
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

const deleteUser = async (req: Request<{ id: number }>) => {
	try {
		let data;
		let message: string;
		let status: number;

		const id = req.params.id;

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

export { getUsers, getUserById, addUser, updateUser, deleteUser };
