import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import * as dotenv from 'dotenv';
dotenv.config();

import sequelize from 'databases';
import 'databases/models';

import router from 'api';

const app = express();

const init = async () => {
	await sequelize.sync();
	console.log('Finish load database.');

	app.use(cookieParser());

	app.use(cors());

	app.use(bodyParser.urlencoded({ extended: false }));

	app.use(bodyParser.json());

	app.use('/', express.static('build'));

	const { xss } = require('express-xss-sanitizer');
	app.use(xss());

	app.use('/api', router);
	
// 	app.use(express.static('build'));
    
//     	app.get('/*', function (req, res) {
//        	    res.sendFile('build/index.html', {root: '.'});
//      	});
};

init();

export default app;
