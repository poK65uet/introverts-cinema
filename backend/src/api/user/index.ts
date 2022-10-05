import { Router } from 'express';
import { getUsers, addUser } from './controller';

const router = Router();

router.get('/', getUsers);
router.post('/', addUser);

export default router;
