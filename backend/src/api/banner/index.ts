import Router from 'express';
import { getBanners, getBanner, addBanner, updateBanner, deleteBanner } from './controller';

const router = Router();

router.get('/pagination', getBanners);
router.get('/:id', getBanner);
router.post('/', addBanner);
router.patch('/:id', updateBanner);
router.delete('/:id', deleteBanner);

export default router;
