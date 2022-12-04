import {
	BelongsToManySetAssociationsMixin,
	BelongsToSetAssociationMixin,
	CreationOptional,
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
	NonAttribute
} from 'sequelize';
import sequelize from 'databases';
import Nationality from './Nationality';
import { ActorModel, CategoryModel, DirectorModel, NationalityModel } from './IModel';
import Status from 'utils/constants/Status';

export interface FilmModel extends Model<InferAttributes<FilmModel>, InferCreationAttributes<FilmModel>> {
	id: CreationOptional<number>;
	title: string;
	imageUrl: string;
	trailerUrl: string;
	duration: number;
	openingDay: Date;
	description: string;
	rated: string;
	status: string;
	createdAt: CreationOptional<Date>;
	updatedAt: CreationOptional<Date>;

	Nationality?: NonAttribute<NationalityModel>;
	Categories?: NonAttribute<CategoryModel[]>;
	Actors?: NonAttribute<ActorModel[]>;
	Directors?: NonAttribute<DirectorModel[]>;

	setNationality: BelongsToSetAssociationMixin<NationalityModel, NationalityModel['id']>;
	setCategories: BelongsToManySetAssociationsMixin<CategoryModel, CategoryModel['id']>;
	setActors: BelongsToManySetAssociationsMixin<ActorModel, ActorModel['id']>;
	setDirectors: BelongsToManySetAssociationsMixin<DirectorModel, DirectorModel['id']>;
}

const Film = sequelize.define<FilmModel>(
	'Film',
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		title: {
			allowNull: false,
			unique: true,
			type: DataTypes.STRING
		},
		imageUrl: {
			type: DataTypes.STRING
		},
		trailerUrl: {
			type: DataTypes.STRING
		},
		duration: {
			type: DataTypes.SMALLINT
		},
		openingDay: {
			type: DataTypes.DATE
		},
		description: {
			type: DataTypes.TEXT
		},
		rated: {
			type: DataTypes.STRING
		},
		status: {
			type: DataTypes.STRING,
			defaultValue: Status.ACTIVE
		},
		createdAt: {
			type: DataTypes.DATE
		},
		updatedAt: {
			type: DataTypes.DATE
		}
	},
	{
		tableName: 'film',
		underscored: true
	}
);

Nationality.hasOne(Film);
Film.belongsTo(Nationality);

export default Film;
