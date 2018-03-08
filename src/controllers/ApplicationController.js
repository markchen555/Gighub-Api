import Application from '../db/models/Application';
import Company from '../db/models/Company';
import Job from '../db/models/Job';

const ApplicationController = {
  create: (req, res) => {
    const model = req.body.model;
    const { status, date, offerLink, jobId } = req.body;
    Application.create({
      status,
      date: date || Date.now(),
      offerLink,
      jobId
    })
  },

  findAllByUser: (req, res) => {
    let model = req.model;
    Application.findAll({where: {userId: model.id}})
      .then((data)=>{
        res.status(200).send(data);
      })
      .catch((err)=> {
        res.sendStatus(500);
      })
  },

  findAllByJob: (req, res) => {
    let jobId = req.body.jobId
    Application.findAll({where: {jobId}})
      .then((data)=>{
        res.status(200).send(data);
      })
      .catch((err)=> {
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
  }
}

export default ApplicationController;
