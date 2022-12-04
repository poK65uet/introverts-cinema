import Router from 'express';
import { addShowtime, deleteShowtime, getAllShowtimes, getShowtime, getShowtimes, updateShowtime } from './controller';

const router = Router();

router.get('/pagination', getShowtimes);
router.get('/', getAllShowtimes);
router.get('/:id', getShowtime);
router.post('/', addShowtime);
// router.patch('/:id', updateShowtime);
router.delete('/:id', deleteShowtime);

export default router;
