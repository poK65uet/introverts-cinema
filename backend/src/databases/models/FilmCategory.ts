import { DataTypes } from 'sequelize';
import sequelize from 'databases';
import Film from './Film';
import Category from './Category';

const FilmCategory = sequelize.define(
	'FilmCategory',
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		}
	},
	{
		tableName: 'film_category',
		timestamps: false,
		underscored: true
	}
);

Film.belongsToMany(Category, { through: FilmCategory });
Category.belongsToMany(Film, { through: FilmCategory });

export default FilmCategory;
