import Router from 'express';
import { getActors, getActor, addActor, updateActor, deleteActor } from './controller';

const router = Router();

router.get('/pagination', getActors);
router.get('/:id', getActor);
router.post('/', addActor);
router.patch('/:id', updateActor);
router.delete('/:id', deleteActor);

export default router;
