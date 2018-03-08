import db from '../db';
import Sequelize from 'sequelize';
import Company from './Company';

const Recruiter = db.define('Recruiter', {
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  photoLink: Sequelize.STRING
})

Company.hasMany(Recruiter);
Recruiter.belongsTo(Company);

export default Recruiter;