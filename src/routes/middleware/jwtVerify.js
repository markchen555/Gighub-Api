import jwt from 'jsonwebtoken';
import User from '../../db/models/User';
import Recruiter from '../../db/models/Recruiter';
import Company from '../../db/models/Company';

const APP_SECRET = process.env.APP_SECRET;

const jwtVerify = (type) => {
  const middle = (req, res, next)=> {
    const types = [User, Recruiter, Company];
    const token = req.headers.authorization;
    if(!token){
      res.sendStatus(403);
    } else {
      jwt.verify(token, secret, (err, decoded)=>{
        if(err){
          console.log("ERROR: Failed to complete verification of token.\n", err);
          res.sendStatus(500);
        } else {
          if(!decoded || decoded.type !== type) {
            res.sendStatus(403);
          } else {
            const model = types[decoded.type];
            model.findOne({where: {id: decoded.payload.id}})
              .then((data) => {
                if(data){
                  req.model = data;
                  next()
                } else {
                  res.sendStatus(404);
                }
              })
              .catch((err)=> {
                console.log("ERROR: Failed to error decoding jwt token.\n", err);
                res.sendStatus(500);
              })
          }
        }
      })
    }
  }
}

export default jwtVerify;