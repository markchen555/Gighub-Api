import db from '../db';
import Sequelize from 'sequelize';
import User from './User';
import Company from './Company';

const Recruiter = db.define('Recruiter', {
})

Recruiter.belongsTo(Company);
Recruiter.belongsTo(User);

export default Recruiter;