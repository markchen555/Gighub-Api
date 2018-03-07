import db from '../db';
import Sequelize from 'sequelize';
import User from './User';

const Bio = db.define('Bio', {
  resumeLink: Sequelize.STRING,
  phoneNumber: Sequelize.STRING,
  location: Sequelize.STRING,
  headline: Sequelize.STRING,
  experience: Sequelize.STRING,
  education: Sequelize.STRING,
  linkedin: Sequelize.STRING,
  twitter: Sequelize.STRING,
  github: Sequelize.STRING,
  personal: Sequelize.STRING,
  desiredSalary: Sequelize.STRING,
  employment: Sequelize.JSON
})

Bio.belongsTo(User);

export default Bio;