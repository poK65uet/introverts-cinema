import Router from 'express';
import { verifyAdmin, verifyCustomer, verifyToken } from 'middlewares';
import { createBill, cancelBill, verifyPayment } from './controller';

const router = Router();

router.post('/', verifyToken, verifyCustomer, createBill);
router.post('/cancel', verifyToken, verifyCustomer, cancelBill);
router.post('/verify-payment', verifyToken, verifyCustomer, verifyPayment);

export default router;
