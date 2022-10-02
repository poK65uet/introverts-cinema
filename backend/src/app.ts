import express from 'express';
import bodyParser from 'body-parser';
import routers from 'api';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

import 'databases';

const app = express();

app.use(cookieParser());

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const { xss } = require('express-xss-sanitizer');
app.use(xss());

app.use(routers);

export default app;
