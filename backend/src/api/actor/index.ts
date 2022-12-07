import Router from 'express';
import { verifyAdmin, verifyToken } from 'middlewares';
import { getActors, getActor, addActor, updateActor, deleteActor } from './controller';

const router = Router();

router.get('/pagination', [verifyToken, verifyAdmin], getActors);
router.get('/:id', getActor);
router.post('/', [verifyToken, verifyAdmin], addActor);
router.patch('/:id', [verifyToken, verifyAdmin], updateActor);
router.delete('/:id', [verifyToken, verifyAdmin], deleteActor);

export default router;
