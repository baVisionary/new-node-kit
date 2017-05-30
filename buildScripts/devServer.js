/* eslint-disable no-unused-vars */
/** Note this file was designed for front end loading
/* @todo remove the express and other the application specific code
/* to a server side application file and load express there */
//import base libs that you will need for the application
import 'babel-polyfill';
import express from 'express';
import path from 'path';
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
import moment from 'moment';

//import routes
import oauthRoutes from '../src/server/routes/oauth';
import moviesRoute from '../src/server/routes/moviestore';
import users from '../src/server/routes/users';

//import API's Here
import {default as actorAPI} from '../src/server/api/actors';

//passport imports
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';
import user from '../src/server/models/users';
//import passConfig from '../src/server/passportcf';
import {default as userRoutes} from "../src/server/routes/userroutes";

//import passport strategies
//import PassportGoogle  from 'passport-google-oauth20';

//const GoogleStrategy = PassportGoogle.Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

//Import Web Pack Here
import webpack from 'webpack';
import config from '../webpack.config.dev';

//Database Connection go here
import {default as Database} from  "../src/server/data/db";

/** @todo create a service for loading data into the database
 everytime the application starts for testing */
//Add sample data here
Database.connect().then(() => {
logger.log("Database is connected")
}).catch((error)=>{
  logger.log(error, 'error')
});
//Constants go Here
const port = 3000;
const app = express(() => {
logger.log("Database is connected")
});

/** Database Connections go Here */
mongoose.connect("mongodb://localhost/MovieApp");

app.locals.site ={
    title: 'Movie Center',
    description: ' Node.JS and Express backend, with an EJS template with using Twitter Bootstrap.'
};
app.locals.author = {
    name: 'Chad Martin',
    contact: 'chad.martin@gmail.com'
};



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

//Set Up app folders
app.use('/bower_components',express.static('bower_components'));
app.use('/css', express.static('src/client/public/styles'));
app.use('/images', express.static('src/client/public/images'));


//Get complier for webpack-dev-middleware
const compiler = webpack(config);
//pass complier to

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
//configure passport
//setup passport strategies

passport.use(new GoogleStrategy(
  {
    clientID: '925451362585-olvp633l1lj4qqfecra0jjranrfpepqo.apps.googleusercontent.com',
    clientSecret: 'umUWrxiXyIZ-zCzxFjkp_wyY',
    callbackURL: 'http://localhost:3000/oauth/google/auth',
    passReqToCallback: true

  },
         function (request,accessToken,refreshToken, profile, done)  {

                       return done(null, profile);

         }
));

//setup passport
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done) {
  logger.log(JSON.stringify(user),'error');
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  logger.log(JSON.stringify(user),'error');
  done(null, obj);
});




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
app.use('/users', users )

//cause error to occur
app.use('/errortest', function (req, res, next) {
let err = {message: 'Test route is Testing Error Route', status: 509, stack: [{message: 'An error test', status: 505}, {message: 'From the Movie test error page',status: 501}]}
  next(err)
});

// dev error handler catch all
app.use(function (err, req, res, next) {
  res.status(err['status'] || 500);
  if (err.message) {
    logger.log(err.message,'error');
    res.render('pages/error', {
    message: err.message,
    error: err,
    stack: err.stack

  });
}
else {
  logger.log(err,'error');
  res.render('pages/error', {
  message: err,
  error: err
});
}

})


app.listen(port, function(err) {
  if (err) {
    logger.log(err,'error');
  } else {
    open('http://localhost:' + port);
  }
});
