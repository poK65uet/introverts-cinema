import Router from 'express';
import { verifyAdmin, verifyToken } from '../../middlewares';
import { getDirectors, getDirector, addDirector, updateDirector, deleteDirector } from './controller';

const router = Router();

router.get('/pagination', [verifyToken, verifyAdmin], getDirectors);
router.get('/:id', getDirector);
router.post('/', [verifyToken, verifyAdmin], addDirector);
router.patch('/:id', [verifyToken, verifyAdmin], updateDirector);
router.delete('/:id', [verifyToken, verifyAdmin], deleteDirector);

export default router;
