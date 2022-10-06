import { DataTypes } from 'sequelize';
import sequelize from 'databases';
import Film from './Film';
import Director from './Director';

const FilmDirector = sequelize.define(
	'FilmDirector',
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		}
	},
	{
		tableName: 'film_director',
		timestamps: false,
		underscored: true
	}
);

Film.belongsToMany(Director, { through: FilmDirector });
Director.belongsToMany(Film, { through: FilmDirector });

export default FilmDirector;
