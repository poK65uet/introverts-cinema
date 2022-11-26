import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from 'databases';

export interface BannerModel extends Model<InferAttributes<BannerModel>, InferCreationAttributes<BannerModel>> {
	id: CreationOptional<number>;
	imageUrl: string;
	createdAt: CreationOptional<Date>;
	updatedAt: CreationOptional<Date>;
}

const Banner = sequelize.define<BannerModel>(
	'Banner',
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		imageUrl: {
			type: DataTypes.STRING
		},
		createdAt: {
			type: DataTypes.DATE
		},
		updatedAt: {
			type: DataTypes.DATE
		}
	},
	{
		tableName: 'banner',
		underscored: true
	}
);

export default Banner;
