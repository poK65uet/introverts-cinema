import { Router } from 'express';
import { resetPassword, sendCode } from './controller';

const router = Router();

router.post('/send-code', sendCode);
router.patch('/reset-password', resetPassword);

export default router;

