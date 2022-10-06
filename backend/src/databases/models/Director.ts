import { DataTypes } from 'sequelize';
import sequelize from 'databases';
import Nationality from './Nationality';

const Director = sequelize.define(
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
		}
	},
	{
        tableName: 'director',
        timestamps: false,
		underscored: true
	}
);

Nationality.hasOne(Director);
Director.belongsTo(Nationality);

export default Director;
