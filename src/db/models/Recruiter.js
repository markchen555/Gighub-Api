import db from '../db';
import Sequelize from 'sequelize';

const Recruiter = db.define('Recruiter', {
  userId: Sequelize.INTEGER,
  companyId: Sequelize.INTEGER,
})

export default Recruiter;