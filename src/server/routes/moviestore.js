/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
//@todo change this to use the same pattern as in the other route files
import express from 'express';
import  {default as Movie}  from '../models/movie';
import  {default as MovieService}  from '../api/movieapi';
import {default as Logger} from '../../server/core/logger'


let router = express.Router();
let movieService = new MovieService();
let logger = new Logger();

router.use((req, res, next) => {
  logger.log('invoking movie store route.','info');
  next();
});

//do not define next if you are not going to use it
//unless it is an error handling function
router.get('/', function(req, res,next) {
    logger.log('getting movie list.','debug');

    let command = req.query['command'];
    switch (command) {
      case 'add':
        let movie = new Movie();
        res.render('pages/movies.ejs',{movies:false, adding: movie, editing:false,details:false});
        break;
      case 'edit':

      logger.log('edit a movie.','debug');
       movieService.getbyId(req.query['id']).then((result)=>
     {  logger.log('sending movie list.','debug');
        res.render('pages/movies.ejs',{movies:false, adding:result,editing:true,details:false});
     });
        break;
      case 'details':
      //details
      let movieId = req.params['id'];
      logger.log(`getting movie details by Id: ${movieId}`,'debug');
      movieService.getbyId(movieId).then((match)=>
          {
        logger.log(`Got movie: ${match}`, 'debug')

            res.render('pages/movies.ejs',{movies:false, adding:false, editing:false, details:match});

          }).catch((error) => {
            next(`No matching movie was found for requested Id` );
         })
        break;
      case 'delete':
        break;
      default:
      movieService.get().then((result)=>
    {  logger.log('sending movie list.','debug');
       logger.log(result.length,'info');
       res.render('pages/movies.ejs',{movies: result, adding: false, editing:false, details:false});

    });
    }




});
router.get('/add', function(req, res) {
   logger.log('adding a movie .','debug');
     //use model to build a new movie
     let movie = new Movie();
     res.render('pages/movies.ejs',{movies:false, adding: movie, editing:false, details:false});
});


// Create/Update movie
router.post('/add', (req, res,next) => {
  let movie = req.body;

  movieService.save(movie).then((result)=>
      {
        logger.log(`New movie added: ${result}`, 'debug')
        res.redirect('/movies');

      }).catch((error) => {
        next(`${error}` );
     })

});


router.get('/genre/:id', (req, res, next) => {
  let movieId = req.params['id'];
  logger.log(`getting movie genre by Id: ${movieId}`,'debug');
  movieService.getbyId(movieId).then((match)=>
      {
    logger.log(`Got movie: ${match}`, 'debug')

        res.json(match.genre);

      }).catch((error) => {
        next(`No matching movie was found for the requested Id ${error}` );
     })

});


router.get('/delete/:id', (req, res, next) => {
  let movieId = req.params['id'];
  logger.log(`removing movie by Id: ${movieId}`,'debug');
  movieService.remove(movieId).then((result)=>
      {
    logger.log(` movie was removed:`, 'debug')
        if(result === 200) res.redirect('/movies');


      }).catch((error) => {
        next(`No matching movie to delete ${error}` );
     })

});


/** Error handling Here we put the error message into an error object
    and pass it along to the error handling route on devServer.js using next */
router.use(function (err, req, res, next) {
    let error = {message: err, status: 501}
  logger.log(`Error in moviestore.js While getting movie details This happened, ${err} a`,'error');
  next(error);
})


export default router;
