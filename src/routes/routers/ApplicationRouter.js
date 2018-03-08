import express from 'express';
import jwtVerify from '../middleware/jwtVerify';
import ApplicationController from '../../controllers/ApplicationController';

const applicationRouter = express.Router();

applicationRouter.route('/create')
  .post(jwtVerify(0), ApplicationController.create);

applicationRouter.route('/update')
  .put(jwtVerify(1), ApplicationController.update);



export default applicationRouter;