import { Router } from 'express';
import { getUsers, getUser, addUser, deleteUser, getMe, changeInfo, changePassword, checkPassword } from './controller';
import { verifyToken, verifyAdmin, verifyCustomer } from 'middlewares';

const router = Router();

router.get('/me', [verifyToken, verifyCustomer], getMe);
router.post('/checkPassword', [verifyToken, verifyCustomer], checkPassword);
router.patch('/changeInfo', [verifyToken, verifyCustomer], changeInfo);
router.patch('/changePassword', [verifyToken, verifyCustomer], changePassword);

router.get('/pagination', [verifyToken, verifyAdmin], getUsers);
router.get('/:id', [verifyToken, verifyAdmin], getUser);
router.post('/', [verifyToken, verifyAdmin], addUser);
router.delete('/:id', [verifyToken, verifyAdmin], deleteUser);

export default router;
