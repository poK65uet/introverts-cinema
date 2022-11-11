import bcrypt from 'bcrypt';
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from 'databases';

export interface UserCodeModel extends Model<InferAttributes<UserCodeModel>, InferCreationAttributes<UserCodeModel>> {
	id: CreationOptional<number>;
	email: string;
	code: string;
	expires: Date;
	createdAt: CreationOptional<Date>;
}

const UserCode = sequelize.define<UserCodeModel>(
	'UserCode',
	{
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
		code: {
			allowNull: false,
			unique: true,
			type: DataTypes.STRING
		},
		expires: {
			allowNull: false,
			type: DataTypes.DATE,
			defaultValue: new Date(Date.now() + 1000 * 60 * 30)
		},
		createdAt: {
			type: DataTypes.DATE
		}
	},
	{
		tableName: 'user_code',
		underscored: true
	}
);

// UserCode.beforeCreate(token => {
// 	const hashedPassword = bcrypt.hashSync(token.code, 10);
// 	token.code = hashedPassword;
// });

export default UserCode;
