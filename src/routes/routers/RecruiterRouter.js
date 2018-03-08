import express from 'express';
import RecruiterController from '../../controllers/RecruiterController';

const RecruiterRouter = express.Router();

RecruiterRouter.route('/login/:name/:password')
  .get(RecruiterController.login);
  
RecruiterRouter.route('/signup')
  .post(RecruiterController.signup);

  export default RecruiterRouter;