/* eslint-disable no-unused-vars */
import 'babel-polyfill';
import express from 'express';
import path from 'path';
import compression from 'compression';
import open from 'open';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
//import other libs
import {default as log} from '../src/server/core/logger';
//Add logger info
let logger = new log();
// sets config options on winston
logger.cfg({consoleLevel: 'debug',fileLevel: 'error'});


//import routes
import oauthRoutes from '../src/server/routes/oauth';
import moviesRoute from '../src/server/routes/moviestore';

//import API's Here
import {default as actorAPI} from '../src/server/api/actors';

//passport imports
import mongoose from 'mongoose';

//import session from 'express-session';
//import user from '../src/server/models/users';
//import passConfig from '../src/server/passportcf';
import {default as userRoutes} from "../src/server/routes/userroutes";
// Import Database Connection here
import {default as Database} from  "../src/server/data/db";

/* eslint-disable no-console */

const port = 3000;
const app = express();

app.use(compression());

//Set Up app folders
app.use(express.static('dist'));
app.use('/css', express.static('../dist/styles'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

/** @todo create a service for loading data into the database
 everytime the application starts for testing */
//Add sample data here
Database.connect().then(() => {
logger.log("Database is connected")
}).
catch((error)=>{
  logger.log(error, 'error')
});


/** Database Connections go Here */
mongoose.connect("mongodb://localhost/MovieApp");

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

app.use(methodOverride())

app.use(logger.dev);


// parses request cookies, populating
// req.cookies and req.signedCookies
// when the secret is passed, used
// for signing the cookies.

app.use(cookieParser('foobars'));
// parses json, x-www-form-urlencoded, and multipart/form-data

//Configure ejs vies
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'../src/server/views/')); //set as default path for views
app.set("view options", { layout: false });




/** Mount Api's Here */


//oauth routes
app.use('/oauth', oauthRoutes);

app.use('/v1/api/', userRoutes);

//Actors Api
app.use('/v1/api/actors', actorAPI )

 /** Mount Routes Here */
 //the moviesite data object is only used it for the example of showing server side templates and should come from a file or database
 //This will be our sites opening view module

//mount movie store module here
app.use('/movies', moviesRoute);

//Users Route
//app.use('/users', users )

//cause error to occur
app.use('/errortest', function (req, res, next) {
let err = {message: 'Test route is Testing Error Route', status: 509, stack: [{message: 'An error test', status: 505}, {message: 'From the Movie test error page',status: 501}]}
  next(err)
});


// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  logger.log(err ,'error');
  res.status(err['status'] || 500);
  res.render('pages/error.ejs', {
    message: err.message,
    error: {}
  });
  })


app.listen(port, function(err) {
  if (err) {
    logger.log(err);
  } else {
    open('http://localhost:' + port);
  }
});
