import db from '../db';
import Sequelize from 'sequelize';

const Resume = db.define('resume', {
  userId: Sequelize.INTEGER,
  achievements: Sequelize.TEXT,
  licenseCerts: Sequelize.TEXT,
  education: Sequelize.JSON
})

export default Resume;