import db from '../db';
import Sequelize from 'sequelize';

const Company = db.define('company', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  keys: Sequelize.JSON,
})

export default Company;