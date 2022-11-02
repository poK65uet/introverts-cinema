import { DataTypes } from 'sequelize';
import sequelize from 'databases';
import Nationality from './Nationality';

const Actor = sequelize.define(
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
			type: DataTypes.DATE
		}
	},
	{
		tableName: 'actor',
		timestamps: false,
		underscored: true
	}
);

Nationality.hasOne(Actor);
Actor.belongsTo(Nationality);

export default Actor;
