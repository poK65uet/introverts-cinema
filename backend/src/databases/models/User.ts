import { DataTypes } from 'sequelize';
import sequelize from 'databases';

const User = sequelize.define(
	'User',
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		email: {
			allowNull: false,
			unique: true,
			type: DataTypes.STRING
		},
		password: {
			allowNull: false,
			type: DataTypes.STRING
		},
		fullName: {
			type: DataTypes.STRING
		},
		birthDay: {
			type: DataTypes.DATE
		}
	},
	{
		tableName: 'user',
		underscored: true
	}
);

export default User;
