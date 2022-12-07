import Router from 'express';
import { verifyAdmin, verifyToken } from 'middlewares';
import { getFilms, getFilm, addFilm, updateFilm, deleteFilm, getOpeningFilm, getUpcomingFilm } from './controller';

const router = Router();

router.get('/pagination', [verifyToken, verifyAdmin], getFilms);
router.get('/opening', getOpeningFilm);
router.get('/upcoming', getUpcomingFilm);

router.get('/:id', getFilm);
router.post('/', [verifyToken, verifyAdmin], addFilm);
router.patch('/:id', [verifyToken, verifyAdmin], updateFilm);
router.delete('/:id', [verifyToken, verifyAdmin], deleteFilm);

export default router;
