import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from 'databases';

export interface RatedModel extends Model<InferAttributes<RatedModel>, InferCreationAttributes<RatedModel>> {
	id: CreationOptional<number>;
	code: string;
}

const Rated = sequelize.define<RatedModel>(
	'Rated',
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		code: {
			allowNull: false,
			unique: true,
			type: DataTypes.STRING
		}
	},
	{
		tableName: 'rated',
		timestamps: false,
		underscored: true
	}
);

export default Rated;
