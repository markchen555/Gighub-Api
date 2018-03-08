import express from 'express';
import UserController from '../../controllers/UserController';
import jwtVerify from '../middleware/jwtVerify';

const userRouter = express.Router();

userRouter.route('/login/:username/:password')
  .get(UserController.login);

userRouter.route('/signup')
  .post(UserController.signup);

userRouter.route('/:id')
  .get(UserController.getBio);

userRouter.route('/edit')
  .put(jwtVerify(0), UserController.updateBio);
  
export default userRouter;