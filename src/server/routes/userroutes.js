/* eslint-disable no-unused-vars */
import express from 'express';
import passport from 'passport';
import mongoose from 'mongoose';
import jwt from "jsonwebtoken";
import User from '../models/users';
import {default as log} from '../../server/core/logger'

//create logger;
let logger = new log();

//@todo move to service file
class UserService
{
  constructor(){
   let register = (req, res, next) => {
     let user = new User();
     logger.log(`register user ${JSON.stringify(req.body)}`,'info' );
     logger.log(`username: ${req.body.username} displayname: ${req.body.displayname} email: ${req.body.email} password: ${req.body.password} `,'info');
     user.username = req.body.username;
     user.displayname = req.body.displayname;
     user.email = req.body.email;
     user.setPassword(req.body.password);
     user.save(function(err, user) {
       if(err) return next(err);
       res.send(`Registration Complete. Please login. ${user.username}`);
     });
   }


   let login = (req, res, next) => {
     if(!req.body.username || !req.body.password) return res.status(400).send("Please fill out every field");
     passport.authenticate('local', function (err, user, info) {
       logger.log(`Error in userrouter.login for ${user.username}`,'error');
       if(err) return next(err);
       if(user) return res.json({ token : user.generateJWT() });
         return res.status(400).send(info);
     })(req, res, next)
   }




    // End the Services Router Middleware Functions

         //object to be returned
         let userrouter = {
           register: register,
           login: login
         };
         return userrouter;
  }
}

let userservice = new UserService();

let router = express.Router();

router.post('/register',userservice.register);

router.post('/login', userservice.login);

//we only export
export default router;
