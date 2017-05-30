/* eslint-disable no-unused-vars */
/** add Movie App Client Services here
*   This class will be where the you put Client side services
*/
import {default as $http} from './httpservice';
export class HomeService
{
  static load() {
     let url = {url: '/'};
     return $http(url);

  }
}

export class MovieService
{
  static getMovieList() {
     let url = {url: '/movies/list'};
     return $http(url);

  }
  static addMovie(movie) {
     let url = {url: '/movies/add'};
     return $http(url);
  }
  static deleteMovie(id) {
     let url = {url: '/movies/delete'};
     return $http(url);
  }

}
