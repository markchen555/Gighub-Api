import db from '../db';
import Sequelize from 'sequelize';
import User from './User';
import Job from './Job';
import Recruiter from './Recruiter';
import Company from './Company';

const Application = db.define('Application', {
  status: Sequelize.SMALLINT,
  date: Sequelize.DATE,
  offerLink: Sequelize.STRING,
  round: Sequelize.SMALLINT,
})

User.hasMany(Application);
Application.belongsTo(User);

Job.hasMany(Application);
Application.belongsTo(Job);

Recruiter.hasMany(Application);
Application.belongsTo(Recruiter);


export default Application;