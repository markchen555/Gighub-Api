import db from '../db';
import Sequelize from 'sequelize';

const Bio = db.define('Bio', {
  userId: Sequelize.INTEGER,
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
  desiredSalary: Sequelize.STRING
})

export default Bio;
