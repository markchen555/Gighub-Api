import Recruiter from '../db/models/Recruiter';
import Company from '../db/models/Company';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const APP_SECRET_RECRUITER = process.env.APP_SECRET_RECRUITER;
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);

const RecruiterController = {
  signup: (req, res) => {
    const { firstName, lastName, email, password, username, SUKey } = req.body;
    const [companyId, key] = SUKey.split('$');
    Recruiter.findOne({where:{username}})
      .then((recruiter)=>{
        if(recruiter){
          res.status(409).send({error: "Username already exists."})
        } else {
          Company.findOne({where: {id: companyId}})
            .then((company)=>{
              if(!company){
                res.status(404).send({error: "Failed to find appropriate company."})
              } else {
                let bank = company.keys;
                let fullName = [firstName, lastName].join('').toLowerCase();
          
                let hash = bank[fullName];
                bcrypt.compare(key, hash, (err, success)=>{
                  console.log(fullName, hash, success);
                  if(err){
                    console.log("ERROR: Failed to compare key with hash in Recruiter signup");
                    res.sendStatus(500);
                  } else {
                    if(success){
                      bcrypt.hash(password, SALT_ROUNDS, (err, password)=>{
                        if(err){
                          console.log("ERROR: Failed to hash password in Recruiter signup");
                          res.sendStatus(500);
                        } else {
                          Recruiter.create({
                            username,
                            firstName,
                            lastName,
                            email,
                            password,
                          })
                            .then((recruiter)=>{
                              delete bank[fullName];
                              Company.update({keys: bank}, {where: {id: companyId}})
                                .then((updated)=>{
                                  if(updated){
                                    jwt.sign({
                                      id: recruiter.id,
                                      firstName,
                                      lastName,
                                      email
                                    }, APP_SECRET_RECRUITER, { expiresIn: 30 * 24 * 60 * 60 * 1000}, (err, token)=> {
                                      if(err){
                                        console.log("ERROR: Failed to sign jwt in recruiter login \n", err);
                                        res.sendStatus(500);
                                      } else {
                                        res.status(200).send(token);
                                      }
                                    })
                                  }
                                })
                                .catch((err)=>{
                                  console.log("ERROR: Failed to delete Company Key on Recruiter Signup \n", err);
                                })
                            })
                        }
                      })
                    } else {
                      res.status(404).send({error: "Name/Key combination does not exist"})
                    }
                  }
                })
              }
            })
            .catch((err)=>{
              console.log("ERROR: Failed to query Company Table");
              res.sendStatus(500);
            })
        }
      })
      .catch((err)=>{
        console.log("ERROR: Failed to query Recruiter Table");
        res.sendStatus(500);
      })
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
                const { id, firstName, lastName, email, photoLink } = recruiter
                jwt.sign({
                  id,
                  firstName,
                  lastName,
                  email,
                  photoLink
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