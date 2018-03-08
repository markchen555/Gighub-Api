import Application from '../db/models/Application';

const ApplicationController = {
  create: (req, res) => {
    let model = req.body.model;
    Application.create({
      status: req.body.status,
      date: req.body.date || Date.now(),
      offerLink: req.body.offerLink,
      round: 0
    })
  }
}

export default ApplicationController;
