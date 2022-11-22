import {
	CreationOptional,
	DataTypes,
	ForeignKey,
	InferAttributes,
	InferCreationAttributes,
	Model,
	NonAttribute,
	BelongsToGetAssociationMixin
} from 'sequelize';
import sequelize from 'databases';
import Nationality, { NationalityModel } from './Nationality';

export interface DirectorModel extends Model<InferAttributes<DirectorModel>, InferCreationAttributes<DirectorModel>> {
	id: CreationOptional<number>;
	fullName: string;
	birthDay: Date;
	NationalityId: ForeignKey<NationalityModel['id']>;
	Nationality?: NonAttribute<NationalityModel>;
	createdAt: CreationOptional<Date>;
	updatedAt: CreationOptional<Date>;
	getNationality: BelongsToGetAssociationMixin<NationalityModel>;
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
		NationalityId: {
			type: DataTypes.INTEGER
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
