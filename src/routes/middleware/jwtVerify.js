import jwt from 'jsonwebtoken';
import User from '../../db/models/User';
import Recruiter from '../../db/models/Recruiter';
import Company from '../../db/models/Company';

const userSecret = process.env.APP_SECRET_USER;
const companySecret = process.env.APP_SECRET_COMPANY;
const recruiterSecret = process.env.APP_SECRET_RECRUITER;

const jwtVerify = (type)=>{
  let types = [User, Recruiter, Company];
  let secrets = [userSecret, recruiterSecret, companySecret];

  let model = types[type];
  let secret = secrets[type];

  const middle = (req, res, next) => {
    let token = req.headers.authorization;
    if(!token){
      res.sendStatus(403);
    } else {
      jwt.verify(token, secret, (err, decoded)=>{
        if(err) {
          res.sendStatus(403);
        } else {
          model.findOne({where: {id: req.body.id}})
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
      })
    }
  }

  return middle
}

export default jwtVerify;