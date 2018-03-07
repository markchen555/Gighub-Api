import db from '../db';
import Sequelize from 'sequelize';
import User from './User';

const Resume = db.define('resume', {
  achievements: Sequelize.TEXT,
  licenseCerts: Sequelize.TEXT,
  education: Sequelize.JSON
})

Resume.belongsTo(User);

export default Resume;