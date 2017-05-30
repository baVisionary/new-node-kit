/**
* Movie.js this is our model for a movie
* @TODO make this a mongoose.Schema model instead of this approach
*/
import {default as log} from '../../server/core/logger'

//import {default as observable, observe}  from '../core/observer.js';
//here we define the private property keys
let s_id = Symbol('id');
let s_title = Symbol('title');
let s_genre = Symbol('genre');
let s_thumbnail = Symbol();
//create logger;
let logger = new log();
export default class Movie
{
  //Getters for Properties
  get _id(){return this[s_id]}
  get title(){return this[s_title]}
  get genre(){return this[s_genre]}
  get thumbnail(){return this[s_thumbnail]}
  //Setters for Properties
  constructor(id,title="a Movie",genre='Syfy',thumbnail=''){
    this[s_id] = id;
    this[s_title] = title;
    this[s_genre] = genre;
    this[s_thumbnail] = thumbnail;

  }


}


/** this var is so that we have a Singleton Collection class */
let instance = null;
/** MovieCollection Class */
export class MovieCollection {
   get length(){
     return this.movies.length;
   }
   get list(){
     return this.movies
   }
   get created(){
     return this.movies.timeStamp;

   }
    constructor(){

    if(!instance){
             instance = this;
             this.movies = [];
             // to test whether we have singleton or not
             this.timeStamp = logger.time();
             //@todo: change this to a log statment;
             logger.log(`A movie collection was created at ${this.timeStamp}`,'debug');
       }


       return instance;

  }
  add (movie= new Movie())
  {
   this.movies[this.length] = movie;
   //@todo: change this to a log statment;
   logger.log(`movie: ${movie.title} was update at ${logger.time()}`,'debug');
  }
  delete (id=-1)
  {
    let index = this.movies.findIndex((movie)=>{return movie.id === id; });
    if(!index)
    {
      throw new Error('You must enter a vaild id')
     }
     else{

       logger.log(`movie: ${this.movies[index].title} was deleted at ${logger.time()}`,'debug');
       this.movies.splice(index, 1);
     }

  }
  filter (filter = (movie)=>{return movie.genre === 'SyFy'; })
  {
   //@todo: change this to a log statment;
   logger.log(`movie filter ran at ${logger.time()}`,'debug');
   return this.movies.filter(filter);
  }
  //this allows you to watch all items in a collection and if something changes
  // We will call the callback function you can also only watch one item in the list
  //@todo finish this
  itemsObservable(callback,index=-1){
    if(index === -1)
    {
  //  for(let m of this.movies){
  //  let o = observable(m);
  //  observe(callback);
  //  }
    }
    else {
      //observable(this.movies[index]);
      //observe(callback);
    }
  }



}
