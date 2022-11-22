import Router from 'express';
import { getDirectors, getDirector, addDirector, updateDirector, deleteDirector } from './controller';

const router = Router();

router.get('/pagination', getDirectors);
router.get('/:id', getDirector);
router.post('/', addDirector);
router.patch('/:id', updateDirector);
router.delete('/:id', deleteDirector);

export default router;
