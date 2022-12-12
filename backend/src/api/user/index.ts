import { Router } from 'express';
import {
	getUsers,
	getUser,
	addUser,
	deleteUser,
	getMe,
	changeInfo,
	changePassword,
	verifyPassword
} from './controller';
import { verifyToken, verifyAdmin, verifyCustomer } from 'middlewares';

const router = Router();

router.get('/me', [verifyToken, verifyCustomer], getMe);
router.patch('/change-info', [verifyToken, verifyCustomer], changeInfo);
router.patch('/change-password', [verifyToken, verifyCustomer], changePassword);
router.post('/verify-password', [verifyToken, verifyCustomer], verifyPassword);

router.get('/pagination', [verifyToken, verifyAdmin], getUsers);
router.get('/:id', [verifyToken, verifyAdmin], getUser);
router.post('/', [verifyToken, verifyAdmin], addUser);
router.delete('/:id', [verifyToken, verifyAdmin], deleteUser);

export default router;
