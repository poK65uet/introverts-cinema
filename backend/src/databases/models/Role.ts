import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from 'databases';

export interface RoleModel extends Model<InferAttributes<RoleModel>, InferCreationAttributes<RoleModel>> {
	// Some fields are optional when calling RoleModel.create() or RoleModel.build(	)
	id: CreationOptional<number>;
	name: string;
}

const Role = sequelize.define<RoleModel>(
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
			unique: true,
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
