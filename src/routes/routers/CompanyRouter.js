import express from 'express';
import CompanyController from '../../controllers/CompanyController';
import jwtVerify from '../middleware/jwtVerify';
import JobController from '../../controllers/JobController';
const companyRouter = express.Router();

companyRouter.route('/login/:name/:password')
  .get(CompanyController.login);

companyRouter.route('/signup')
  .post(CompanyController.signup);

companyRouter.route('/generate')
  .post(jwtVerify(2), CompanyController.generateSUKey);

companyRouter.route('/test')
  .get(CompanyController.deleteThis);

companyRouter.post('/create')
  .post(jwtVerify(2), JobController.create);
  
export default companyRouter;