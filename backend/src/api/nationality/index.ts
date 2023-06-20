import Router from 'express';
import { verifyAdmin, verifyToken } from '../../middlewares';
import { getNationalities, getNationality, addNationality, updateNationality, deleteNationality } from './controller';

const router = Router();

router.get('/pagination', [verifyToken, verifyAdmin], getNationalities);
router.get('/:id', getNationality);
router.post('/', [verifyToken, verifyAdmin], addNationality);
router.patch('/:id', [verifyToken, verifyAdmin], updateNationality);
router.delete('/:id', [verifyToken, verifyAdmin], deleteNationality);

export default router;
