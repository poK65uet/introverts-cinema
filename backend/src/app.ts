import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

import * as dotenv from 'dotenv';
dotenv.config();

import sequelize from './databases';
import './databases/models';
import router from './api';
import { UserModel } from './databases/models/User';
declare global {
	namespace Express {
		interface Request {
			user: UserModel;
		}
	}
}

const app = express();

const corsOptions = {
	origin: '*',
	optionsSuccessStatus: 200
};

const init = async () => {
	await sequelize.sync();
	console.log('Finish load database.');

	app.use(cookieParser());

	app.use(cors(corsOptions));

	app.use(bodyParser.urlencoded({ extended: false }));

	app.use(bodyParser.json());

	const { xss } = require('express-xss-sanitizer');
	app.use(xss());

	app.use('/api', router);

	// app.use(express.static(path.join('../frontend/build')));

	// app.get('/*', function (req, res) {
	// 	res.sendFile(path.join('../frontend/build', 'index.html'));
	// });

	// app.use(express.static(path.join('./build')));

	// app.get('/*', function (req, res) {
	// 	res.sendFile(path.join('./build', 'index.html'));
	// });
};

init();

export default app;
