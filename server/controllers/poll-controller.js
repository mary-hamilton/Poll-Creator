import Poll from "../models/Poll.js";

export const getPolls = (req, res) => {
  Poll.find()
    .then((polls) => {
      res.send(polls)
    })
}

export const createPoll = (req, res) => {
  const { title, endTime, options } = req.body

  const newPoll = new Poll({ title, endTime, options })
  newPoll.save()
    .then((savedPoll) => {
      res.send({
        message: 'New poll created',
        'poll': savedPoll
      })
    })
    .catch((error) => {
      res.status(400);
      res.statusMessage = error.toString()
      res.send();
    });
}

export const deletePolls = (req, res) => {
  const { id } = req.params;
  Poll.findById(id)
    .then((foundPoll) => {
      if (!foundPoll) {
        throw new Error('Poll is not found')
      }
      return Poll.findByIdAndDelete(id)
    })
    .then(() => {
      res.send({
        message: 'Poll has been deleted'
      })
    })
    .catch((error) => {
      res.status(404)
      res.send({
        message: error.toString()
      })
    })
}