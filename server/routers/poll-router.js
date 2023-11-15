import express from "express";
import { getPolls, createPoll, deletePolls } from "../controllers/poll-controller.js";
import { isAdmin } from "../controllers/auth-controller.js";


const pollRouters = express.Router();

pollRouters.get('/', getPolls)
pollRouters.use(isAdmin)
pollRouters.post('/', createPoll)
pollRouters.delete('/:id', deletePolls)

export default pollRouters