import express from 'express';
import RecruiterController from '../../controllers/RecruiterController';
import jwtVerify from '../middleware/jwtVerify';
import ApplicationController from '../../controllers/ApplicationController';

const recruiterRouter = express.Router();

recruiterRouter.route('/login/:name/:password')
  .get(RecruiterController.login);
  
recruiterRouter.route('/signup')
  .post(RecruiterController.signup);

recruiterRouter.route('/apps')
  .get(jwtVerify(1), ApplicationController.findAllByJob);

export default recruiterRouter;