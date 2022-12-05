import Router from 'express';
import { verifyAdmin, verifyCustomer, verifyToken } from 'middlewares';
import { createBill, cancelBill } from './controller';

const router = Router();

router.post('/', verifyToken, verifyCustomer, createBill);
router.post('/cancel', verifyToken, verifyCustomer, cancelBill);

export default router;
