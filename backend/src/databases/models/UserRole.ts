import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from 'databases';
import User from './User';
import Role from './Role';

export interface UserRoleModel extends Model<InferAttributes<UserRoleModel>, InferCreationAttributes<UserRoleModel>> {
	// Some fields are optional when calling UserRoleModel.create() or UserRoleModel.build(	)
	id: CreationOptional<number>;
}

const UserRole = sequelize.define<UserRoleModel>(
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
