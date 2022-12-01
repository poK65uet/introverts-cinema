import Router from 'express';
import { addRoom, deleteRoom, getRoom, getRooms, updateRoom } from './cotroller';

const router = Router();

router.get('/pagination', getRooms);
router.get('/:id', getRoom);
router.post('/', addRoom);
router.patch('/:id', updateRoom);
router.delete('/:id', deleteRoom);

export default router;
