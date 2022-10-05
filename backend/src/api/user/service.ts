import { Role, User } from 'databases/models';
import UserPayload from './UserPayload';
const addUser = async (newUser: UserPayload) => {
	return User.create(newUser);
};

const getAll = async () => {
	const users = await User.findAll({ include: Role });
	return users;
};

export { getAll, addUser };
