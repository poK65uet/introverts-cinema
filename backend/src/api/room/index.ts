import Router from 'express';
import { verifyToken, verifyAdmin } from 'middlewares';
import { addRoom, deleteRoom, getRoom, getRooms, updateRoom } from './controller';

const router = Router();

router.get('/pagination', [verifyToken, verifyAdmin], getRooms);
router.get('/:id', getRoom);
router.post('/', [verifyToken, verifyAdmin], addRoom);
router.patch('/:id', [verifyToken, verifyAdmin], updateRoom);
router.delete('/:id', [verifyToken, verifyAdmin], deleteRoom);

export default router;
