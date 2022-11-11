import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from 'databases';
import Nationality from './Nationality';

export interface DirectorModel extends Model<InferAttributes<DirectorModel>, InferCreationAttributes<DirectorModel>> {
	id: CreationOptional<number>;
	fullName: string;
	birthDay: string;
	createdAt: CreationOptional<Date>;
	updatedAt: CreationOptional<Date>;
}

const Director = sequelize.define<DirectorModel>(
	'Director',
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		fullName: {
			allowNull: false,
			type: DataTypes.STRING
		},
		birthDay: {
			type: DataTypes.DATE
		},
		createdAt: {
			type: DataTypes.DATE
		},
		updatedAt: {
			type: DataTypes.DATE
		}
	},
	{
		tableName: 'director',
		underscored: true
	}
);

Nationality.hasOne(Director);
Director.belongsTo(Nationality);

export default Director;
