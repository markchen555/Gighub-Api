import Job from '../db/models/Job';

const JobController = {
  create: (req, res) => {
    const companyId = req.model.id;
    const { headline, description, salaryStart, salaryEnd, location, keywords } = req.body;
    Job.create({
      companyId,
      headline,
      description,
      salaryStart,
      salaryEnd,
      location,
      keywords
    })
      .then(()=>{
        res.sendStatus(201);
      })
      .catch((err)=>{
        console.log("ERROR: Failed to create entry in Jobs table");
        res.sendStatus(500);
      })
  },

  update:(req, res) => {
    const companyId = req.model.id;
    const update = req.body.update;
    Job.findOne({where: {id: req.body.id}})
      .then((job)=>{
        if(!job){
          res.status(404).send({error: "Failed to find matching Job"})
        } else {
          if(job.companyId !== companyId){
            res.sendStatus(403);
          } else {
            job.update(update)
              .then(()=>{
                res.sendStatus(204);
              })
              .catch((err) => {
                console.log("ERROR: Failed to update entry in Job table.\n", err);
                res.sendStatus(500);
              })
          }
        }
      })
      .catch((err)=>{
        console.log("ERROR: Failed to query Job Table. \n", err);
        res.sendStatus(500);
      })
  },
  all: (req, res) => {
    Job.findAll()
      .then((data)=>{
        res.status(200).send(data);
      })
      .catch((err) => {
        console.log("ERROR: Failed to query Job table. \n", err);
        res.endStatus(500);
      })
  },

  allJobsByCompany: (req, res) => {
    const companyId = req.params.jobId || req.model.id;
    if(!companyId){
      res.status(400).send({error: "Company must be specified"})
    } else {
      Job.findAll({where: {companyId: companyId}})
        .then((data)=>{
          res.status(200).send(data);
        })
        .catch((err) => {
          console.log("ERROR: Failed to query Job table. \n", err);
          res.endStatus(500);
        })
    }
  },

  delete: (req, res) => {
    const companyId = req.model.id;
    console.log("OMG THIS IS THE REQ", req.body);
    console.log("JOB ID IS!!!!!!!!!!!!!!!!!!!!!:", req.body.jobId)
    Job.destroy({where: {id: req.body.jobId}})
      .then(()=>{
        res.sendStatus(204);
      })
      .catch((err) => {
        console.log("ERROR: Failed to delete entry in Job table \n", err);
        res.sendStatus(500);
      })
  }
}

export default JobController;