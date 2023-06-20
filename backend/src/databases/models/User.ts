import bcrypt from 'bcrypt';
import {
	CreationOptional,
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
	HasManyGetAssociationsMixin,
	NonAttribute,
	HasManySetAssociationsMixin
} from 'sequelize';
import sequelize from '../../databases';
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
	setRoles: HasManySetAssociationsMixin<RoleModel, RoleModel['id']>;
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

export default User;
