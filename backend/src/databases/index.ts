import { Sequelize } from 'sequelize';
import config from 'config';

console.log(config.mysql_database);

const sequelize = new Sequelize(config.mysql_database, config.mysql_username, config.mysql_password, {
	host: config.mysql_host,
	dialect: 'mysql'
});

export default sequelize;
