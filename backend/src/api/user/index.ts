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

router.get('/me', [verifyToken], getMe);
router.patch('/change-info', [verifyToken], changeInfo);
router.patch('/change-password', [verifyToken], changePassword);
router.post('/verify-password', [verifyToken], verifyPassword);

router.get('/pagination', [verifyToken, verifyAdmin], getUsers);
router.get('/:id', [verifyToken, verifyAdmin], getUser);
router.post('/', [verifyToken, verifyAdmin], addUser);
router.delete('/:id', [verifyToken, verifyAdmin], deleteUser);

export default router;
