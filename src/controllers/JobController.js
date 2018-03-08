import Job from '../db/models/Job';

const JobController = {
  create: (req, res) => {
    let companyId = req.model.id;
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

  delete: (req, res) => {
    let companyId = req.model.id;
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