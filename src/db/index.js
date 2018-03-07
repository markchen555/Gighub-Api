import db from './db';

db.authenticate()
  .then(()=>{
    console.log('Gighub successfully connected to AWS RDS');
  })
  .catch(()=>{
    console.log('Error connecting to RDS')
  })

export default db;