import db from '../db';
import Sequelize from 'sequelize';
import User from './User';
import Job from './Job';


const Application = db.define('Application', {
  status: Sequelize.SMALLINT,
  date: Sequelize.DATE,
  offerLink: Sequelize.STRING,
  round: Sequelize.SMALLINT
})

Application.belongsTo(User);
Application.belongsTo(Job);

export default Application;