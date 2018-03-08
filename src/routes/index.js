import express from 'express';
import userRouter from './routers/UserRouter';
import companyRouter from './routers/CompanyRouter';

const router = express.Router();

router.use('/user', userRouter);
router.use('/company', companyRouter);

export default router;