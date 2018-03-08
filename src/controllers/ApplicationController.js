import Application from '../db/models/Application';
import Company from '../db/models/Company';
import Job from '../db/models/Job';
import Sequelize from 'sequelize';

const ApplicationController = {
  create: (req, res) => {
    Application.create({
      userId: req.model.id,
      jobId: req.body.jobId
    })
      .then(()=>{
        res.sendStatus(201);
      })
      .catch((err)=>{
        res.sendStatus(500);
      })

  },

  findAllByUser: (req, res) => {
    Application.findAll({where: {userId: req.model.id}})
      .then((data)=>{
        res.status(200).send(data);
      })
      .catch((err)=> {
        res.sendStatus(500);
      })
  },

  findAllByCompany: (req, res) => {
    let companyId = req.model.companyId || req.model.id;
    Jobs.findAll({where: {companyId}}, {include: {model: Application, where: { jobId: Sequelize.col(job.id)}}})
      .then((data)=> {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.sendStatus(500);
      })
  },

  update: (req, res) => {
    const update = req.body.update;
    update.recruiterId = req.model.id;
    Application.findOne({where: {id: req.body.id}})
      .then((application)=>{
        if(!application){
          res.status(404).send({error: "Failed to find corresponding Application"})
        } else {
          application.update({update})
            .then(()=>{
              res.sendStatus(204);
            })
            .catch((err)=> {
              console.log("ERROR: Failed to update entry in Application Table")
              res.sendStatus(500);
            })
        }
      })
      .catch((err)=>{
        console.log("ERROR: Failed to search Application table. \n", err);
        res.sendStatus(500);
      })
  },

  delete: (req, res) => {
    Application.findOne({where: {id: req.body.id}})
      .then((application)=> {
        if(application.userId !== req.model.id){
          res.sendStatus(403);
        } else {
          application.delete();
        }
      })
      .catch((err)=>{
        console.log("ERROR: Failed to delete entry in Application table.\n", err);
        res.sendStatus(500);
      })
  }
}

export default ApplicationController;
