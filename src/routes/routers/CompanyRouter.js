import express from 'express';
import CompanyController from '../../controllers/CompanyController';

const companyRouter = express.Router();

companyRouter.route('/login/:name/:password')
  .get(CompanyController.login);

companyRouter.route('/signup')
  .post(CompanyController.signup);

export default companyRouter;