import express from 'express';
import RecruiterController from '../../controllers/RecruiterController';
import jwtVerify from '../middleware/jwtVerify';
const RecruiterRouter = express.Router();

RecruiterRouter.route('/login/:name/:password')
  .get(RecruiterController.login);
  
RecruiterRouter.route('/signup')
  .post(RecruiterController.signup);

export default RecruiterRouter;