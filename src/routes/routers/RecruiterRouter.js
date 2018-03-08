import express from 'express';
import RecruiterController from '../../controllers/RecruiterController';
import jwtVerify from '../middleware/jwtVerify';
import ApplicationController from '../../controllers/ApplicationController';

const RecruiterRouter = express.Router();

RecruiterRouter.route('/login/:name/:password')
  .get(RecruiterController.login);
  
RecruiterRouter.route('/signup')
  .post(RecruiterController.signup);

RecruiterRouter.route('/apps')
  .get(jwtVerify(1), ApplicationController.findAllByCompany);
  
export default RecruiterRouter;