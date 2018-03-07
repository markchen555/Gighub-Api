import express from 'express';
import UserController from '../../controllers/UserController';

const userRouter = express.Router();

userRouter.route('/login/:username/:password')
  .get(UserController.login);

userRouter.route('/signup')
  .post(UserController.signup);

export default userRouter;