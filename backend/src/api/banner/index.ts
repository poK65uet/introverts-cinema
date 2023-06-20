import Router from 'express';
import { verifyAdmin, verifyToken } from '../../middlewares';
import { getBanners, getBanner, addBanner, updateBanner, deleteBanner } from './controller';

const router = Router();

router.get('/', getBanners);
router.get('/:id', getBanner);
router.post('/', [verifyToken, verifyAdmin], addBanner);
router.put('/:id', [verifyToken, verifyAdmin], updateBanner);
router.delete('/:id', [verifyToken, verifyAdmin], deleteBanner);

export default router;
