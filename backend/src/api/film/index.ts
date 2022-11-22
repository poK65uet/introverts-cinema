import Router from 'express';
import {
	getFilms,
	getFilm,
	addFilm,
	updateFilm,
	deleteFilm,
	getFilmActors,
	addFilmActors,
	deleteFilmActors,
	getFilmDirectors,
	addFilmDirectors,
	deleteFilmDirectors,
	getFilmCategories,
	addFilmCategories,
	deleteFilmCategories,
	getOpeningFilm,
	getUpcomingFilm
} from './controller';

const router = Router();

router.get('/pagination', getFilms);
router.get('/opening', getOpeningFilm);
router.get('/upcoming', getUpcomingFilm);

router.get('/:id', getFilm);
router.post('/', addFilm);
router.patch('/:id', updateFilm);
router.delete('/:id', deleteFilm);

router.get('/:id/categories', getFilmCategories);
router.post('/:id/categories', addFilmCategories);
router.delete('/:id/categories', deleteFilmCategories);

router.get('/:id/actors', getFilmActors);
router.post('/:id/actors', addFilmActors);
router.delete('/:id/actors', deleteFilmActors);

router.get('/:id/directors', getFilmDirectors);
router.post('/:id/directors', addFilmDirectors);
router.delete('/:id/directors', deleteFilmDirectors);

export default router;
