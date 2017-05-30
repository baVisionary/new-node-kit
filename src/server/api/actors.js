import express from 'express';
import {default as Logger} from '../../server/core/logger'
let logger = new Logger();
let router = express.Router();

let actors = [
  {firstName: 'Harrison', lastName: 'Ford'},
  {firstName: 'Sigourney', lastName: 'Weaver'},
  {firstName: 'Bill', lastName: 'Murray'}
];

// get all actors
router.get('/', (req, res) => {
  res.json(actors);
});

// post a new actor
router.post('/', (req, res) => {
  logger.log(req.body,'info');
  let newActor = req.body;
  actors.push(newActor);
  res.sendStatus(201);
});

export default router;
