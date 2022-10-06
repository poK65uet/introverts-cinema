import { DataTypes } from 'sequelize';
import sequelize from 'databases';
import Film from './Film';
import Actor from './Actor';

const FilmActor = sequelize.define(
	'FilmActor',
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		}
	},
	{
		tableName: 'film_actor',
		timestamps: false,
		underscored: true
	}
);

Film.belongsToMany(Actor, { through: FilmActor });
Actor.belongsToMany(Film, { through: FilmActor });

export default FilmActor;
