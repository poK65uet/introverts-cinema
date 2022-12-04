import Router from 'express';
import { createBill } from './controller';

const router = Router();

router.post('/', createBill);

export default router;
