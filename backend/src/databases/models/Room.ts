import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from '../../databases';

export interface RoomModel extends Model<InferAttributes<RoomModel>, InferCreationAttributes<RoomModel>> {
	id: CreationOptional<number>;
	name: string;
	visionType: string;
	colNumber: number;
	rowNumber: number;
	colEmpty: string;
	rowEmpty: string;
	createdAt: CreationOptional<Date>;
	updatedAt: CreationOptional<Date>;
}

const Room = sequelize.define<RoomModel>(
	'Room',
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		name: {
			allowNull: false,
			unique: true,
			type: DataTypes.STRING
		},
		visionType: {
			type: DataTypes.STRING
		},
		colNumber: {
			type: DataTypes.INTEGER
		},
		rowNumber: {
			type: DataTypes.INTEGER
		},
		colEmpty: {
			type: DataTypes.STRING,
			defaultValue: '0'
		},
		rowEmpty: {
			type: DataTypes.STRING,
			defaultValue: '0'
		},
		createdAt: {
			type: DataTypes.DATE
		},
		updatedAt: {
			type: DataTypes.DATE
		}
	},
	{
		tableName: 'room',
		underscored: true
	}
);

export default Room;
