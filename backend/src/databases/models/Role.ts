import { DataTypes } from 'sequelize';
import sequelize from 'databases';
import { timeStamp } from 'console';

const Role = sequelize.define(
	'Role',
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		name: {
			allowNull: false,
			type: DataTypes.STRING
		}
	},
	{
		tableName: 'role',
		timestamps: false,
		underscored: true
	}
);

export default Role;
