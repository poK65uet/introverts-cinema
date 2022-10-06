import { Role, User } from 'databases/models';
import UserPayload from './UserPayload';
const addUser = async (newUser: UserPayload) => {
	const user = await User.create(newUser);
	return user;
};

const getAll = async () => {
	const users = await User.findAll({ include: Role });
	return users;
};

export { getAll, addUser };
