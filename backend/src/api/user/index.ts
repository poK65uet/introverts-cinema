import { Router } from 'express';
import { getUsers, getUser, addUser, updateUser, deleteUser, changePassword } from './controller';
import { verifyToken, verifyAdmin, verifyCustomer } from 'middlewares';

const router = Router();

router.get('/pagination', getUsers);
router.get('/:id', getUser);
router.post('/', addUser);
router.patch('/:id', updateUser);
router.patch('/:id/changePassword', changePassword);
router.delete('/:id', deleteUser);

export default router;
