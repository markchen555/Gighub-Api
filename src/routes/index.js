import express from 'express';
import userRouter from './routers/UserRouter';
import companyRouter from './routers/CompanyRouter';
import recruiterRouter from './routers/RecruiterRouter';

const router = express.Router();

router.use('/user', userRouter);
router.use('/company', companyRouter);
router.use('/recruiter', recruiterRouter);

export default router;