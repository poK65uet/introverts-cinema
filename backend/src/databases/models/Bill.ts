import {
	CreationOptional,
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
	NonAttribute,
	BelongsToSetAssociationMixin,
	HasManyAddAssociationMixin
} from 'sequelize';
import sequelize from '../../databases';
import User, { UserModel } from './User';
import Seat, { SeatModel } from './Seat';
import Showtime, { ShowtimeModel } from './Showtime';

export interface BillModel extends Model<InferAttributes<BillModel>, InferCreationAttributes<BillModel>> {
	id: CreationOptional<number>;
	totalPrice: number;
	paymentStatus: string;
	User?: NonAttribute<UserModel>;
	Showtime?: NonAttribute<ShowtimeModel>;
	Seats?: NonAttribute<SeatModel[]>;
	setUser: BelongsToSetAssociationMixin<UserModel, UserModel['id']>;
	setShowtime: BelongsToSetAssociationMixin<ShowtimeModel, ShowtimeModel['id']>;
	addSeat: HasManyAddAssociationMixin<SeatModel, SeatModel['id']>;
}

const Bill = sequelize.define<BillModel>(
	'Bill',
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		totalPrice: {
			type: DataTypes.BIGINT
		},
		paymentStatus: {
			type: DataTypes.STRING
		}
	},
	{
		tableName: 'bill',
		underscored: true
	}
);

User.hasOne(Bill);
Bill.belongsTo(User);

Showtime.hasOne(Bill);
Bill.belongsTo(Showtime);

export default Bill;
