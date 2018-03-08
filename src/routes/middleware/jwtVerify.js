import jwt from 'jsonwebtoken';
import User from '../../db/models/User';
import Recruiter from '../../db/models/Recruiter';
import Company from '../../db/models/Company';

const userSecret = process.env.APP_SECRET_USER;
const companySecret = process.env.APP_SECRET_COMPANY;
const recruiterSecret = process.env.APP_SECRET_RECRUITER;

const jwtVerify = (type)=>{
  const types = [User, Recruiter, Company];
  const secrets = [userSecret, recruiterSecret, companySecret];

  const model = types[type];
  const secret = secrets[type];

  const middle = (req, res, next) => {
    const token = req.headers.authorization;
    const decoded = jwt.decode(token, {complete: true})
    if(!token || !decoded.payload.id){
      res.sendStatus(403);
    } else {
      jwt.verify(token, secret, (err, success)=>{
        if(err){
          res.sendStatus(500);
        } else {
          if(!success) {
            res.sendStatus(403);
          } else {
            model.findOne({where: {id: decoded.payload.id}})
              .then((data) => {
                if(data){
                  req.model = data;
                  next()
                } else {
                  console.log(model, data);
                  res.sendStatus(404);
                }
              })
              .catch((err)=> {
                console.log(err);
                res.sendStatus(500);
              })
          }
        }
      })
    }
  }

  return middle
}

export default jwtVerify;