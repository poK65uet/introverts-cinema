import { Sequelize } from 'sequelize';
import config from 'config';
import { UserModel } from 'databases/models';

console.log(1);

const sequelize = new Sequelize(config.mysql_database, config.mysql_username, config.mysql_password, {
	host: config.mysql_host,
	dialect: 'mysql',
	logging: console.log
});

sequelize
	.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
	})
	.catch(error => {
		console.error('Unable to connect to the database: ', error);
	});

const User = UserModel(sequelize);

sequelize.sync();

export default sequelize;
export { User };
