import {
	BelongsToSetAssociationMixin,
	CreationOptional,
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
	NonAttribute
} from 'sequelize';
import sequelize from '../../databases';
import Nationality, { NationalityModel } from './Nationality';

export interface ActorModel extends Model<InferAttributes<ActorModel>, InferCreationAttributes<ActorModel>> {
	id: CreationOptional<number>;
	fullName: string;
	birthDay: Date;
	createdAt: CreationOptional<Date>;
	updatedAt: CreationOptional<Date>;

	Nationality?: NonAttribute<NationalityModel>;
	setNationality: BelongsToSetAssociationMixin<NationalityModel, NationalityModel['id']>;
}

const Actor = sequelize.define<ActorModel>(
	'Actor',
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
		tableName: 'actor',
		underscored: true
	}
);

Nationality.hasOne(Actor);
Actor.belongsTo(Nationality);

export default Actor;
