import db from '../db';
import Sequelize from 'sequelize';

const Company = db.define('company', {
  name: Sequelize.STRING
})

export default Company;