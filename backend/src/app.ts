import express from 'express';
import bodyParser from 'body-parser';
import routers from 'api';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

import sequelize from 'databases';

async function assertDatabaseConnectionOk() {
	console.log(`Checking database connection...`);
	try {
		await sequelize.authenticate();
		console.log('Database connection OK!');
	} catch (error) {
		console.log('Unable to connect to the database:');
		console.log(error.message);
		process.exit(1);
	}
}

const app = express();

async function init() {
	await assertDatabaseConnectionOk();

	app.use(cookieParser());

	app.use(cors());

	app.use(bodyParser.urlencoded({ extended: false }));

	app.use(bodyParser.json());

	const { xss } = require('express-xss-sanitizer');
	app.use(xss());

	app.use(routers);
}

init();

export default app;
