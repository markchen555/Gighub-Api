import db from './db';
import Bio from './models/Bio';
import Company from './models/Company';
import Recruiter from './models/Recruiter';
import Resume from './models/Resume';
import User from './models/User';
import Job from './models/Job';
import Application from './models/Application';

const force = {force: true}

User.sync(force)
  .then(()=>{
    Bio.sync(force);
    Resume.sync(force);
    Company.sync(force)
      .then(()=>{
        Recruiter.sync(force);
        Job.sync(force)
          .then(()=>{
            Application.sync(force);
          })
      })
  })


db.authenticate()
  .then(()=>{
    console.log('Gighub successfully connected to AWS RDS');
  })
  .catch(()=>{
    console.log('Error connecting to RDS')
  })

export default db;