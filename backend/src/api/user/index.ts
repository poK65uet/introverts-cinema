import { Router } from 'express';
import { getUsers, getUser, addUser, deleteUser, changeInfo, changePassword, checkPassword } from './controller';
import { verifyToken, verifyAdmin, verifyCustomer } from 'middlewares';

const router = Router();

router.get('/pagination', getUsers);
router.get('/:id', getUser);
router.post('/', addUser);
router.delete('/:id', deleteUser);

router.post('/:id/checkPassword', checkPassword);
router.patch('/:id/changeInfo', changeInfo);
router.patch('/:id/changePassword', changePassword);

export default router;
