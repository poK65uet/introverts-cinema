import { DataTypes } from 'sequelize';
import sequelize from 'databases';
import User from './User';
import Role from './Role';

const UserRole = sequelize.define(
	'UserRole',
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		}
	},
	{
		tableName: 'user_role',
		timestamps: false,
		underscored: true
	}
);
User.belongsToMany(Role, { through: UserRole });
Role.belongsToMany(User, { through: UserRole });

export default UserRole;
