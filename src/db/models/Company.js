import db from '../db';
import Sequelize from 'sequelize';

const Company = db.define('company', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

export default Company;