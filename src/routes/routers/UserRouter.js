import express from 'express';
import UserController from '../../controllers/UserController';
import jwtVerify from '../middleware/jwtVerify';
import ApplicationController from '../../controllers/ApplicationController';

const userRouter = express.Router();

userRouter.route('/login/:username/:password')
  .get(UserController.login);

userRouter.route('/signup')
  .post(UserController.signup);

userRouter.route('/profile/:id')
  .get(UserController.getBio);

userRouter.route('/edit')
  .put(jwtVerify(0), UserController.updateBio);

userRouter.route('/myapps')
  .get(jwtVerify(0), ApplicationController.findAllByUser);
  
export default userRouter;