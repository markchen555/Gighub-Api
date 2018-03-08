import Recruiter from '../db/models/Recruiter';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SALT_ROUNDS = process.env.SALT_ROUNDS;
const RecruiterController = {
  signup: (req, res) => {
    const { username, password, firstName, lastName, email, SUKey } = req.body;
    if(!name || !password || !firstName || !lastName || !email || !key){
      res.status(400).send({error: "Fields cannot be empty"})
    } else {
      Recruiter.findOne({where: {username}})
        .then((recruiter)=>{
          if(recruiter){
            res.status(409).send({error: "Username already exists"});
          } else {
            let [companyId, key] = SUKey.split('$');
            Company.findOne({id:{name: companyId}})
              .then((company)=>{
                let keys = company.keys
                bcrypt.hash(key, SALT_ROUNDS, (err, hash)=>{
                  if(err){
                    console.log("ERROR: Failed to hash key in recruiter signup \n", err);
                    res.sendStatus(500);
                  } else {
                    if(keys.has(hash)){
                      bcrypt.hash(password, SALT_ROUNDS, (err, password)=>{
                        if(err){
                          console.log("ERROR: Failed to hash password in recruiter signup \n", err)
                          res.sendStatus(500);
                        } else {
                          Recruiter.create({
                            name,
                            password,
                            firstName,
                            lastName,
                            email,
                            companyId: company.id,
                          })
                            .then((recruiter)=>{
                              const {name, firstName, lastName} = recruiter;
                              const companyName = company.name;
                              delete keys[hash];
                              Company.update({keys}, {where: {id: company.id}})
                              jwt.sign({
                                name,
                                firstName,
                                lastName,
                                companyName
                              }, APP_SECRET_RECRUITER, { expiresIn: 30 * 24 * 60 * 60 * 1000}, (err, token)=> {
                                if(err){
                                  console.log("ERROR: Failed to sign jwt in recruiter login \n", err);
                                  res.sendStatus(500);
                                } else {
                                  res.status(200).send(token);
                                }
                              })
                            })
                            .catch((err)=>{
                              console.log("ERROR: Failed to create a recruiter in recruiter signup \n", err);
                              res.sendStatus(500);
                            })
                        }
                      })
                    } else {
                      res.status(403).send({error: "Invalid key"})
                    }
                  }   
                })
              })
              .catch((err)=>{
                res.status(404).send({error: "Failed to find appropriate company."});
              })
          }
        })
        .catch((err)=>{
          console.log("ERROR: Failed to query Recruiter Table in recruiter signup \n", err);
          res.sendStatus(500);
        })
    }
  },

  login: (req, res)=> {
    const { name, password } = req.params;
    Recruiter.findOne({where: {name}})
      .then((recruiter)=> {
        if(!recruiter){
          res.status(404).send({error: "Recruiter/Password does not match"})
        } else {
          let hashed = recruiter.password;
          bcrypt.compare(password, hashed, (err, success)=>{
            if(err){
              console.log("ERROR: Failed to compare hashed password in recruiter login \n", err);
              res.sendStatus(500);
            } else {
              if(success){
                jwt.sign({
                  name: recruiter.name
                }, APP_SECRET_RECRUITER, { expiresIn: 30 * 24 * 60 * 60 * 1000}, (err, token)=> {
                  if(err){
                    console.log("ERROR: Failed to sign jwt in recruiter login \n", err);
                    res.sendStatus(500);
                  } else {
                    res.status(200).send(token);
                  }
                })
              } else {
                res.status(403).send({error: "Username/Password does not match"})
              }
            }
          })
        }
      })
      .catch((err)=> {
        console.log("ERROR: Failed to query Recruiter table in Recruiter login \n", err);
        res.sendStatus(500);
      })
  }
}

export default RecruiterController;