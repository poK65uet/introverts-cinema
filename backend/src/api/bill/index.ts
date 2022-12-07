import Router from 'express';
import { verifyAdmin, verifyCustomer, verifyToken } from 'middlewares';
import { createBill } from './controller';

const router = Router();

router.post('/', verifyToken, verifyCustomer, createBill);

export default router;
