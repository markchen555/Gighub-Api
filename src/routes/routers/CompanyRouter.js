import express from 'express';
import jwtVerify from '../middleware/jwtVerify';

import CompanyController from '../../controllers/CompanyController';
import JobController from '../../controllers/JobController';
import ApplicationController from '../../controllers/ApplicationController';

const companyRouter = express.Router();

companyRouter.route('/login/:name/:password')
  .get(CompanyController.login);

companyRouter.route('/signup')
  .post(CompanyController.signup);

companyRouter.route('/key')
  .get(jwtVerify(2), CompanyController.listSUKeys)
  .post(jwtVerify(2), CompanyController.generateSUKey)
  .delete(jwtVerify(2), CompanyController.deleteSUKey);

companyRouter.route('/jobs')
  .put(jwtVerify(2), JobController.update)
  .post(jwtVerify(2), JobController.create)
  .delete(jwtVerify(2), JobController.delete);
  
companyRouter.route('/apps')
  .get(jwtVerify(2), ApplicationController.findAllByJob);
  
export default companyRouter;