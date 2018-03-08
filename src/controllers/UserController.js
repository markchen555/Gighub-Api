import User from '../db/models/User';
import Bio from '../db/models/Bio';
import Recruiter from '../db/models/Recruiter';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);
const APP_SECRET_USER = process.env.APP_SECRET_USER;

const UserController = {
  signup: (req, res) => {
    const { username, password, firstName, lastName, email } = req.body;
    if(!username || !password || !firstName || !lastName || !email){
      res.status(400).send({error: "Fields cannot be empty"})
    } else {
      User.findOne({where: {username}})
        .then((user)=>{
          if(user){
            res.status(409).send({error: "User already exists"});
          } else {
            bcrypt.hash(password, SALT_ROUNDS, (err, password)=>{
              if(err){
                console.log("ERROR: Failed to hash password in user signup \n", err)
                res.sendStatus(500);
              } else {
                User.create({
                  username,
                  password,
                  firstName,
                  lastName,
                  email
                })
                  .then((user)=>{
                    Bio.create({
                      userId: user.id
                    })
                    .catch((err)=> {
                      console.log("ERROR: Failed to create BIO for newly created user in user signup \n", err)
                    })
                    const { id, firstName, lastName, email } = user;
                    jwt.sign({
                      id,
                      firstName,
                      lastName,
                      email
                    }, APP_SECRET_USER, { expiresIn: 30 * 24 * 60 * 60 * 1000}, (err, token)=> {
                      if(err){
                        console.log("ERROR: Failed to sign jwt in user login \n", err);
                        res.sendStatus(500);
                      } else {
                        res.status(200).send(token);
                      }
                    })
                  })
                  .catch((err)=>{
                    console.log("ERROR: Failed to create a user in user signup \n", err);
                    res.sendStatus(500);
                  })
              }
            })
          }
        })
        .catch((err)=>{
          console.log("ERROR: Failed to query User Table in user signup \n", err);
          res.sendStatus(500);
        })
    }
  },
  login: (req, res)=> {
    const { username, password } = req.params;
    User.findOne({where: {username}})
      .then((user)=> {
        if(!user){
          res.status(404).send({error: "Username/Password does not match"})
        } else {
          let hashed = user.password;
          bcrypt.compare(password, hashed, (err, success)=>{
            if(err){
              console.log("ERROR: Failed to compare hashed password in user login \n", err);
              res.sendStatus(500);
            } else {
              if(success){
                const { id, firstName, lastName, email, photoLink } = user;
                jwt.sign({
                  id,
                  firstName,
                  lastName,
                  email,
                  photoLink
                }, APP_SECRET_USER, { expiresIn: 30 * 24 * 60 * 60 * 1000}, (err, token)=> {
                  if(err){
                    console.log("ERROR: Failed to sign jwt in user login \n", err);
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
        console.log("ERROR: Failed to query User table in user login \n", err);
        res.sendStatus(500);
      })
  },
  
  getBio: (req, res) => {
    User.findOne({where: {id: req.params.id}, include: [{model: Bio, where: {userId: req.params.id}}]})
      .then((data)=>{
        res.status(200).send(data);
      })
      .catch((err)=>{
        res.sendStatus(500);
      })
  },

  updateBio: (req, res) => {
    let id = req.model.id;
    let update = req.body;
    Bio.update(update, {where: {userId: id}})
      .then(()=>{
        res.sendStatus(204);
      })
      .catch((err)=>{
        console.log("ERROR: Failed to update Bio for user \n", err);
        res.sendStatus(500);
      })
  }
}

export default UserController;