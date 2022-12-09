import Router from 'express';
import { checkEmail, sendCode, verifyAndRegister } from './controller';

const router = Router();
router.post('/', verifyAndRegister);
router.post('/send-code', sendCode);
router.post('/check-email', checkEmail);

export default router;
