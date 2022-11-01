import { Router } from 'express';
import { getUsers, addUser } from './controller';
import { verifyToken, verifyAdmin, verifyCustomer } from 'middlewares';

const router = Router();

router.get('/', [verifyToken, verifyAdmin], getUsers);
router.post('/', addUser);

export default router;
