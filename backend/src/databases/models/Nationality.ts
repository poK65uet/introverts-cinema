import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from '../../databases';

export interface NationalityModel
	extends Model<InferAttributes<NationalityModel>, InferCreationAttributes<NationalityModel>> {
	id: CreationOptional<number>;
	name: string;
	imageUrl: string;
	createdAt: CreationOptional<Date>;
	updatedAt: CreationOptional<Date>;
}

const Nationality = sequelize.define<NationalityModel>(
	'Nationality',
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
		},
		imageUrl: {
			type: DataTypes.STRING
		},
		createdAt: {
			type: DataTypes.DATE
		},
		updatedAt: {
			type: DataTypes.DATE
		}
	},
	{
		tableName: 'nationality',
		underscored: true
	}
);

export default Nationality;
