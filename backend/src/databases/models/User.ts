import bcrypt from 'bcrypt';
import {
	CreationOptional,
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
	HasManyGetAssociationsMixin,
	HasManyAddAssociationMixin,
	HasManyAddAssociationsMixin,
	HasManyRemoveAssociationMixin,
	HasManyRemoveAssociationsMixin,
	NonAttribute
} from 'sequelize';
import sequelize from 'databases';
import { RoleModel } from './Role';
export interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
	// Some fields are optional when calling UserModel.create() or UserModel.build(	)
	id: CreationOptional<number>;
	email: string;
	password: string;
	fullName: string;
	phone: string;
	birthDay: Date;
	createdAt: CreationOptional<Date>;
	updatedAt: CreationOptional<Date>;
	Roles?: NonAttribute<RoleModel[]>;
	getRoles: HasManyGetAssociationsMixin<RoleModel>;
	addRole: HasManyAddAssociationMixin<RoleModel, RoleModel['id']>;
	addRoles: HasManyAddAssociationsMixin<RoleModel, RoleModel['id']>;
	removeRole: HasManyRemoveAssociationMixin<RoleModel, RoleModel['id']>;
	removeRoles: HasManyRemoveAssociationsMixin<RoleModel, RoleModel['id']>;
}

const User = sequelize.define<UserModel>(
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
		phone: {
			type: DataTypes.STRING
		},
		birthDay: {
			type: DataTypes.DATEONLY
		},
		createdAt: {
			type: DataTypes.DATE
		},
		updatedAt: {
			type: DataTypes.DATE
		}
	},
	{
		tableName: 'user',
		underscored: true
	}
);

User.beforeCreate(user => {
	const hashedPassword = bcrypt.hashSync(user.password, 10);
	user.password = hashedPassword;
});

export interface UserRequestInfo {
	id: number;
	email: string;
	roleIds: number[];
}

export default User;
