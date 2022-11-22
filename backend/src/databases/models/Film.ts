import {
	BelongsToGetAssociationMixin,
	BelongsToManyAddAssociationsMixin,
	BelongsToManyGetAssociationsMixin,
	BelongsToManyRemoveAssociationsMixin,
	CreationOptional,
	DataTypes,
	ForeignKey,
	InferAttributes,
	InferCreationAttributes,
	Model,
	NonAttribute
} from 'sequelize';
import sequelize from 'databases';
import Nationality from './Nationality';
import { ActorModel, CategoryModel, DirectorModel, NationalityModel } from './IModel';

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
	NationalityId: ForeignKey<NationalityModel['id']>;

	Nationality?: NonAttribute<NationalityModel>;
	Categories?: NonAttribute<CategoryModel[]>;
	Actors?: NonAttribute<ActorModel[]>;
	Directors?: NonAttribute<DirectorModel[]>;

	getNationality: BelongsToGetAssociationMixin<NationalityModel>;

	getCategories: BelongsToManyGetAssociationsMixin<CategoryModel>;
	addCategories: BelongsToManyAddAssociationsMixin<CategoryModel, CategoryModel['id']>;
	removeCategories: BelongsToManyRemoveAssociationsMixin<CategoryModel, CategoryModel['id']>;

	getActors: BelongsToManyGetAssociationsMixin<ActorModel>;
	addActors: BelongsToManyAddAssociationsMixin<ActorModel, ActorModel['id']>;
	removeActors: BelongsToManyRemoveAssociationsMixin<ActorModel, ActorModel['id']>;

	getDirectors: BelongsToManyGetAssociationsMixin<DirectorModel>;
	addDirectors: BelongsToManyAddAssociationsMixin<DirectorModel, DirectorModel['id']>;
	removeDirectors: BelongsToManyRemoveAssociationsMixin<DirectorModel, DirectorModel['id']>;
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
			type: DataTypes.STRING
		},
		rated: {
			type: DataTypes.STRING
		},
		status: {
			type: DataTypes.STRING,
			defaultValue: 'inactive'
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
		tableName: 'film',
		underscored: true
	}
);

Nationality.hasOne(Film);
Film.belongsTo(Nationality);

export default Film;
