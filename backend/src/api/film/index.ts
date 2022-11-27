import Router from 'express';
import { getFilms, getFilm, addFilm, updateFilm, deleteFilm, getOpeningFilm, getUpcomingFilm } from './controller';

const router = Router();

router.get('/pagination', getFilms);
router.get('/opening', getOpeningFilm);
router.get('/upcoming', getUpcomingFilm);

router.get('/:id', getFilm);
router.post('/', addFilm);
router.patch('/:id', updateFilm);
router.delete('/:id', deleteFilm);

export default router;
