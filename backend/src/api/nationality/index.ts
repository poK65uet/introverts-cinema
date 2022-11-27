import Router from 'express';
import { getNationalities, getNationality, addNationality, updateNationality, deleteNationality } from './controller';

const router = Router();

router.get('/pagination', getNationalities);
router.get('/:id', getNationality);
router.post('/', addNationality);
router.patch('/:id', updateNationality);
router.delete('/:id', deleteNationality);

export default router;
