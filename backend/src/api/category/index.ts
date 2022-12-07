import Router from 'express';
import { verifyAdmin, verifyToken } from 'middlewares';
import { getCategories, getCategory, addCategory, updateCategory, deleteCategory } from './controller';

const router = Router();

router.get('/pagination', [verifyToken, verifyAdmin], getCategories);
router.get('/:id', getCategory);
router.post('/', [verifyToken, verifyAdmin], addCategory);
router.patch('/:id', [verifyToken, verifyAdmin], updateCategory);
router.delete('/:id', [verifyToken, verifyAdmin], deleteCategory);

export default router;
