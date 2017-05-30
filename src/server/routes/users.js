/* eslint-disable no-unused-vars */
import express from 'express';
//import jsonfileservice'  This is for servering a user data file for testing;
import{default as jsonfileservice} from "./utils/jsonfileservice";
import {default as log} from '../../server/core/logger'
//create logger;
let logger = new log();


//User Service
let list = [];
class UserService
{
   constructor(){
     let userlog = (req, res, next) => {
       if(list.length === 0)
       {
          loadlistfromJsonServer();
       }
       logger.log(`Request URL: ${req.originalUrl}`, 'debug')
       next()
     }
     //private method
     let loadlistfromJsonServer = () =>{
       let jsfileservice = new jsonfileservice();
        let result = jsfileservice.getFile('/../../data/' + 'user.json');
        list = result.users
        return true;
     }
     //Begin Router Middleware Functions
     let checkForSecretKey = (req, res, next)=> {
       //checkForSecretKey function
       let secret = req.query['secret'];
       if (secret !== 'fishtacos') {
         res.status(401).send('You are not authorized!');
       } else {
         next();
       }
     }
     let userlist = (req, res)=>{
            logger.log(`Users has ${list.length} records`,'info');
            res.send(list);
     };
     // GET count of users.
    let count =  (req, res) => {
      if(list.length === 0)
      {
         loadlistfromJsonServer();
      }
      res.send(`<h3>Users = ${list.length.toString()}</h3>`);
   };

   //Add addtional Methods here
  let getUserbyID = (req, res) => {
  // retrieve the product id from the route parameter
  let userId = req.params['id'];

  // get matching user
  let index = list.findIndex((u) => u.id == userId);
  //findIndex returns -1 if no matches are found
  if (index === -1) {
    // if no matching product then return 404 HTTP Status Code
    res.status(404).send(`Could not find product with id ${userId}`);
  } else {
    // otherwise show product name
    res.send(`<h3>Hear are the details:</h3>
      for the user with the id of ${userId} </br>
      <em>Name:</em> ${list[index].firstName} ${list[index].lastName}</br>
      <em>Email:</em> ${list[index].email}
                                           `);
  }
};
let listRoute =  (req, res) => {
  let pageIndex = req.query['page'] || 0;
  let sortOrder = req.query['sort'] || 'Last Name';
  res.send(`Getting list of products for page index ${pageIndex}
    and sort order ${sortOrder}`);
};

// End the Services Router Middleware Functions

     //object to be returned
     let userrouter = {
       userlog: userlog,
       checkForSecretKey: checkForSecretKey,
       userlist: userlist,
       length: count,
       getUser: getUserbyID,
       listRoute: listRoute
     };
     return userrouter;
    }

}
// all code above this point could be moved into a user service file
//Below is where all the magic happens
//define express Router
//let userRouter = new UserService();

let router = express.Router();

//setup for google
router.get('/', function(req, res) {
  res.render('users', {user: {name: req.user.displayName,
                              image: req.user._json.image.url}});
});





//we only export
export default router;
