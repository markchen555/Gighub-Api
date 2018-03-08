import express from 'express';
import UserController from '../../controllers/UserController';
import jwtVerify from '../middleware/jwtVerify';
import ApplicationController from '../../controllers/ApplicationController';
import JobController from '../../controllers/JobController';

const userRouter = express.Router();

userRouter.route('/login/:username/:password')
  .get(UserController.login);

userRouter.route('/signup')
  .post(UserController.signup);

userRouter.route('/profile/:id')
  .get(UserController.getBio);

userRouter.route('/edit')
  .put(jwtVerify(0), UserController.updateBio);

userRouter.route('/apps')
  .get(jwtVerify(0), ApplicationController.findAllByUser)
  .post(jwtVerify(0), ApplicationController.create)
  .delete(jwtVerify(0), ApplicationController.delete);

userRouter.route('/browse/:jobId')
    .get(jwtVerify(0), JobController.allJobsByCompany);
  
userRouter.route('/browse')
  .get(jwtVerify(0), JobController.all);

  
export default userRouter;