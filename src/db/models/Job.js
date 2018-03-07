import db from '../db';
import Sequelize from 'sequelize';
import Company from './Company';


const Job = db.define('job', {
  headline: Sequelize.STRING,
  description: Sequelize.TEXT,
  salaryStart: Sequelize.INTEGER,
  salaryEnd: Sequelize.INTEGER,
  location: Sequelize.STRING,
  keywords: Sequelize.JSON
})

Job.belongsTo(Company);

export default Job;