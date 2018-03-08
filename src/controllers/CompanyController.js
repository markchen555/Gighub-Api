import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Company from '../db/models/Company';
import shortid from 'shortid';

const APP_SECRET_COMPANY = process.env.APP_SECRET_COMPANY;
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);
const CompanyController = {
  signup: (req, res) => {
    console.log('this is running', req.body);
    const { name, password } = req.body;
    if(!name || !password){
      res.status(400).send({error: "Fields cannot be empty"})
    } else {
      Company.findOne({where: {name}})
        .then((company)=>{
          if(company){
            res.status(409).send({error: "Company already exists"});
          } else {
            bcrypt.hash(password, SALT_ROUNDS, (err, password)=>{
              if(err){
                console.log("ERROR: Failed to hash password in company signup \n", err)
                res.sendStatus(500);
              } else {
                Company.create({
                  name,
                  password,
                  keys: {}
                })
                  .then((company)=>{
                    jwt.sign({
                      id: company.id,
                      name: company.name
                    }, APP_SECRET_COMPANY, { expiresIn: 30 * 24 * 60 * 60 * 1000}, (err, token)=> {
                      if(err){
                        console.log("ERROR: Failed to sign jwt in company login \n", err);
                        res.sendStatus(500);
                      } else {
                        res.status(200).send(token);
                      }
                    })
                  })
                  .catch((err)=>{
                    console.log("ERROR: Failed to create a company in company signup \n", err);
                    res.sendStatus(500);
                  })
              }
            })
          }
        })
        .catch((err)=>{
          console.log("ERROR: Failed to query Company Table in company signup \n", err);
          res.sendStatus(500);
        })
    }
  },

  login: (req, res)=> {
    const { name, password } = req.params;
    Company.findOne({where: {name}})
      .then((company)=> {
        if(!company){
          res.status(404).send({error: "Company/Password does not match"})
        } else {
          let hashed = company.password;
          bcrypt.compare(password, hashed, (err, success)=>{
            if(err){
              console.log("ERROR: Failed to compare hashed password in company login \n", err);
              res.sendStatus(500);
            } else {
              if(success){
                jwt.sign({
                  id: company.id,
                  name: company.name
                }, APP_SECRET_COMPANY, { expiresIn: 30 * 24 * 60 * 60 * 1000}, (err, token)=> {
                  if(err){
                    console.log("ERROR: Failed to sign jwt in company login \n", err);
                    res.sendStatus(500);
                  } else {
                    res.status(200).send(token);
                  }
                })
              } else {
                res.status(403).send({error: "Company/Password does not match"})
              }
            }
          })
        }
      })
      .catch((err)=> {
        console.log("ERROR: Failed to query Company table in company login \n", err);
        res.sendStatus(500);
      })
  },

  generateSUKey: (req, res) => {
    let company = req.model;
    let key = shortid.generate();
    let SUKey = company.id + '$' + key;
    let bank = company.keys;
    bcrypt.hash(key, SALT_ROUNDS, (err, hashed) =>{
      bank[req.body.name.toLowerCase()] = hashed;
      Company.update({keys: bank}, {where: {id: company.id}})
        .then((updated)=>{
          if(updated){
            res.status(201).send(SUKey);
          } else {
            res.status(500).send({error: "Failed to create key"})
          }
        })
        .catch((err)=>{
          console.log("ERROR: Failed to update Keys column in Company Table in generateSUKey \n", err);
          res.sendStatus(500);
        })
    })
  },

  deleteThis: (req, res) => {
    Company.findAll()
      .then((data) => {
        res.send(data);
      })
      .catch((err)=> {
        console.log('lol howd you fuck this up');
      })
  }
}

export default CompanyController;