import Router from 'express';
import { checkEmail, sendCode, verifyAndRegister } from './controller';

const router = Router();
router.post('/', verifyAndRegister);
router.post('/sendCode', sendCode);
router.post('/checkEmail', checkEmail);

export default router;
