import {
	CreationOptional,
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
	NonAttribute,
	BelongsToSetAssociationMixin
} from 'sequelize';
import sequelize from '../../databases';
import Nationality, { NationalityModel } from './Nationality';

export interface DirectorModel extends Model<InferAttributes<DirectorModel>, InferCreationAttributes<DirectorModel>> {
	id: CreationOptional<number>;
	fullName: string;
	birthDay: Date;
	createdAt: CreationOptional<Date>;
	updatedAt: CreationOptional<Date>;

	Nationality?: NonAttribute<NationalityModel>;
	setNationality: BelongsToSetAssociationMixin<NationalityModel, NationalityModel['id']>;
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
		tableName: 'director',
		underscored: true
	}
);

Nationality.hasOne(Director);
Director.belongsTo(Nationality);

export default Director;
