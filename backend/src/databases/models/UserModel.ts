import { DataTypes, Sequelize } from 'sequelize';

const UserModel = (sequelize: Sequelize) =>
	sequelize.define('user', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		email: {
			allowNull: false,
			type: DataTypes.STRING
		},
		password: {
			allowNull: false,
			type: DataTypes.STRING
		},
		full_name: {
			type: DataTypes.STRING
		}
	});

export default UserModel;
