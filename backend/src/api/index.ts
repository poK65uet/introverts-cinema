import { Router } from 'express';
import loginRouter from './login';
import registerRouter from './register';
import userRouter from './user';
import nationalityRouter from './nationality';
import actorRouter from './actor';
import directorRouter from './director';

const router = Router();

router.use('/login', loginRouter);
router.use('/register', registerRouter);
router.use('/users', userRouter);
router.use('/nationalities', nationalityRouter);
router.use('/actors', actorRouter);
router.use('/directors', directorRouter);

export default router;
