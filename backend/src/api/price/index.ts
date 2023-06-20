import Router from 'express';
import { verifyAdmin, verifyToken } from '../../middlewares';
import { getPrices, updatePrice } from './controller';

const router = Router();

router.get('/', [verifyToken, verifyAdmin], getPrices);
router.put('/:id', [verifyToken, verifyAdmin], updatePrice);

export default router;
