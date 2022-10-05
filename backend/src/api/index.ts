import { Router } from 'express';
import userRouters from './user';

const router = Router();
import { asyncRouteHandler } from 'middlewares';

router.use('/user', asyncRouteHandler(userRouters));

export default router;
