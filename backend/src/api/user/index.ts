import { Router } from 'express';
import { getUsers } from './Controller';

const router = Router();

router.get('/', getUsers);

export default router;
