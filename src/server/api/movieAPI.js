/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
//import our Model Here
import {default as Movie, MovieCollection as movieCollection} from '../models/movie';
import {default as Database} from  "../../server/data/db";
import {default as log} from '../../server/core/logger';
import mongodb from 'mongodb';
//create logger;
let logger = new log();

export default class MovieService
{
  constructor(){

logger.log('Created Movies in the Movie Api', 'debug')

let getMovieCollection = () =>
  {
      return new Promise((resolve, reject) => {

    Database.db.collection('movies').find().toArray().then((result)=>{
        resolve(result);
    }).
    catch((error) => {
         logger.log(`Mongo has a problem: ${error}`, 'debug')
           reject(error);
    })
});
  }
//@todo add other crud functions here
let save = (movie) =>
{
  return new Promise((resolve, reject) => {
    if(movie._id)movie._id = new mongodb.ObjectID(movie._id.trim()); // convert _id to object
    logger.log(`the id is ${movie._id}`, 'debug')
    Database.db.collection('movies').save(movie).then((result)=> {
    logger.log(`the movie is ${result}`, 'debug')
    if(result === null)
    {
      logger.log(`Errror on Save adding Movie to the database`, 'debug')
      reject(`Result was null`);
    }
    else {
      resolve(result);

    }


    }).
catch((error) => {
     logger.log(`Mongo has a problem: ${error}`, 'debug')
       reject(error);
})
});

}

let getMoviebyId = (id) =>
  {
      return new Promise((resolve, reject) => {
        logger.log(`the id is ${id}`, 'debug')
        let movieId = new mongodb.ObjectID(id);
        Database.db.collection('movies').findOne(movieId).then((result)=> {
        logger.log(`the movie is ${result}`, 'debug')
        if(result === null)
        {
          logger.log(`No record Found`, 'debug')
          reject(`Result was null`);
        }
        else {
          resolve(result);

        }


        }).
    catch((error) => {
         logger.log(`Mongo has a problem: ${error}`, 'debug')
           reject(error);
    })
});
  }
  let removeMovie = (id) =>
    {
        return new Promise((resolve, reject) => {
          logger.log(`the id is ${id}`, 'debug')
          let movieId = new mongodb.ObjectID(id);
          Database.db.collection('movies').remove({_id:movieId}).then((result)=> {

                resolve(200);



          }).
      catch((error) => {
           logger.log(`Mongo has a problem: ${error}`, 'debug')
             reject(error);
      })
  });
    }

let queryList = (...queryobj) =>
{

return null;
}

let sort = (col = 'title', dir='1') =>
{

return null;
}

let service = {
    get: getMovieCollection,
    getbyId: getMoviebyId,
    save: save,
    remove: removeMovie,
    filter: queryList,
    sort: sort

};
//return service
return service;
}
}
