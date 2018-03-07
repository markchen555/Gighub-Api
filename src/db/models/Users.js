import db from '../db';
import Sequelize from 'sequelize';

const User = db.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  type: Sequelize.INTEGER,
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  email: Sequelize.STRING,
  photoLink: Sequelize.STRING
})

export default User;