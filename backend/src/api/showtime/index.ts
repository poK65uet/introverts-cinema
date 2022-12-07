import Router from 'express';
import { verifyToken, verifyAdmin } from 'middlewares';
import { addShowtime, deleteShowtime, getAllShowtimes, getShowtime, getShowtimes, updateShowtime } from './controller';

const router = Router();

router.get('/pagination', [verifyToken, verifyAdmin], getShowtimes);
router.get('/', getAllShowtimes);
router.get('/:id', getShowtime);
router.post('/', [verifyToken, verifyAdmin], addShowtime);
// router.patch('/:id', updateShowtime);
router.delete('/:id', [verifyToken, verifyAdmin], deleteShowtime);

export default router;
