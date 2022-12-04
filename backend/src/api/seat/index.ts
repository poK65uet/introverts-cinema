import Router from 'express';
import { getAllSeat } from './controller';

const router = Router();

router.get('/', getAllSeat);

export default router;
