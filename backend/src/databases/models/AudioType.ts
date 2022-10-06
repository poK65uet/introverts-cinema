import { DataTypes } from 'sequelize';
import sequelize from 'databases';

const AudioType = sequelize.define(
	'AudioType',
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		code: {
			allowNull: false,
			unique: true,
			type: DataTypes.STRING
		}
	},
	{
		tableName: 'audio_type',
		timestamps: false,
		underscored: true
	}
);

export default AudioType;
