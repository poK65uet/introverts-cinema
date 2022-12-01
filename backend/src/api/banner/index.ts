import Router from 'express';
import { getBanners, getBanner, addBanner, updateBanner, deleteBanner } from './controller';

const router = Router();

router.get('/', getBanners);
router.get('/:id', getBanner);
router.post('/', addBanner);
router.put('/:id', updateBanner);
router.delete('/:id', deleteBanner);

export default router;
