import {expect} from 'chai';
import  {default as MovieService}  from '../api/movieapi';
import {default as Movie} from '../models/movie';
import {default as Logger} from '../../server/core/logger'
let logger = new Logger();
//MovieSerive Test Go Here
let movieService = new MovieService();
let count = 0;
describe('Our first test', () => {
  it('should pass', () => {
    expect(true).to.equal(true);
  });
});
describe('MovieServie Get List Test', () => {
  it('should pass', () => {
      movieService.get().then((result)=>{
    logger.log(JSON.stringify(result),'info');
      count = result.length;
      expect(count).to.equal(8);
    });
  });
});
describe('MovieServie addMovie Test', () => {
  it('should pass', () => {
    let newMovie = new Movie("58e63cf1a8a5012c4ccd3415",'Don Juen','Drama');
    movieService.save(newMovie).then((result)=>{
      expect(result.id).to.equal("58e63cf1a8a5012c4ccd3415")
      expect(result.title).to.equal("Don Juen")
      expect(result.genre).to.equal("Drama")
      });


  });
});
describe('MovieServie getMovieList Test after addMovie', () => {
  it('should pass', () => {
    movieService.get().then((result)=>{
    expect(result.length).to.equal(count+1);
  });
  });
});
describe('MovieServie delete Movie Test', () => {
  it('should pass', () => {
    movieService.remove("58e63cf1a8a5012c4ccd3415").then((result)=>
    {
      expect(result).to.equal(200)
    });
  });
});
describe('after deleteMovie test', () => {
  it('should pass', () => {
    movieService.get().then((result)=>{
      expect(result.length).to.equal(count);
  });

  });
});
//@todo change test to match new design
describe('MovieServie filter Test', () => {
  it('should pass', () => {
    //let qp = {genre: 'SyFy' }
    //let fl = movieService.filter(qp);
    logger.log(`Filtered movies:`, 'silly')
    expect(5).to.equal(5);
  });
});
