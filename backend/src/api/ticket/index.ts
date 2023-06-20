import Router from 'express';
import { verifyAdmin, verifyCustomer, verifyToken } from '../../middlewares';
import { getTikets, getMyTickets } from './controller';

const router = Router();

router.get('/pagination', [verifyToken, verifyAdmin], getTikets);
router.get('/me', [verifyToken, verifyCustomer], getMyTickets);

export default router;
