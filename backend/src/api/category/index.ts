import Router from 'express';
import { getCategories, getCategory, addCategory, updateCategory, deleteCategory } from './controller';

const router = Router();

router.get('/pagination', getCategories);
router.get('/:id', getCategory);
router.post('/', addCategory);
router.patch('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;
