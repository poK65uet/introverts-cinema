// import sequelize, { User } from 'databases';
import { Role, User } from 'databases/models';
const addUser = async () => {
	return User.create({
		email: 'abcd@gmail.com',
		password: 'password',
		full_name: 'ab'
	});
};

const getAll = async () => {
	const users = await User.findAll({ include: Role });
	return users;
};

export { getAll };
