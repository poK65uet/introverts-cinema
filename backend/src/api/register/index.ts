import Router from 'express';
import { sendCode, verifyAndRegister } from './controller';

const router = Router();
router.post('/', verifyAndRegister);
router.post('/sendCode', sendCode);

export default router;
