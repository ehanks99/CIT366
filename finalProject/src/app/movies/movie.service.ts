import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Movie } from './movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  movieListChangedEvent = new Subject<Movie[]>();
  private movies: Movie[] = [
    new Movie(
      "10",
      "https://m.media-amazon.com/images/M/MV5BODJkZTZhMWItMDI3Yy00ZWZlLTk4NjQtOTI1ZjU5NjBjZTVjXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg", 
      "Kung Fu Panda", 
      "Po might just be the laziest, clumsiest panda in the Valley of Peace, but he secretly dreams of becoming a kung fu legend. When the villainous snow leopard Tai Lung threatens Po's homeland, the hapless panda is chosen to fulfil an ancient prophecy and defend the Valley from attack. Training under Master Shifu, Po embarks on an epic high-kicking adventure as he sets out to thwart Tai Lung's evil plans. A DreamWorks animation.", 
      "PG", 
      ["Jack Black", "Dustin Hoffman", "Angelina Jolie"], 
      ["Mark Osborne", "John Stevenson"], 
      ["Action", "Comedy"]
    ),
    new Movie(
      "11",
      "https://is3-ssl.mzstatic.com/image/thumb/Video123/v4/89/d2/a0/89d2a0d4-6d57-fbc6-544f-b51f92ffdb7a/pr_source.jpg/268x0w.jpg",
      "Jurassic Park", 
      "asdfasdf", 
      "PG", 
      ["Angelina Jolie"], 
      ["Jack"], 
      ["Action", "Comedy"]
    ),
    new Movie(
      "12",
      "https://images-na.ssl-images-amazon.com/images/I/81bEk4cFbHL._SY445_.jpg",
      "Jurassic World", 
      "asdfasdf", 
      "PG", 
      ["Angelina Jolie"], 
      ["Jack"], 
      ["Action", "Comedy"]
    ),
    new Movie(
      "13",
      "https://resizing.flixster.com/HvdEe1T_ga0MDjKBTth0FilcTYw%3D/206x305/v1.bTsxMTE3MDI2MTtqOzE4MzU0OzEyMDA7ODAwOzEyMDA",
      "Rise of the Guardians", 
      "asdfasdf", 
      "PG", 
      ["Angelina Jolie"], 
      ["Jack"], 
      ["Action", "Comedy"]
    ),
    new Movie(
      "14",
      "https://m.media-amazon.com/images/M/MV5BMTk2NzczOTgxNF5BMl5BanBnXkFtZTcwODQ5ODczOQ@@._V1_.jpg",
      "Star Trek: Into Darkness", 
      "asdfasdf", 
      "PG", 
      ["Angelina Jolie"], 
      ["Jack"], 
      ["Action", "Comedy"]
    )
    // ,
    // new Movie(
    //   "15",
    //   "https://upload.wikimedia.org/wikipedia/en/thumb/6/68/The_mummy.jpg/220px-The_mummy.jpg",
    //   "The Mummy", 
    //   "asdfasdf", 
    //   "PG", 
    //   ["Angelina Jolie"], 
    //   ["Jack"], 
    //   ["Action", "Comedy"]
    // ),
    // new Movie(
    //   "16",
    //   "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg",
    //   "The Lord of the Rings: Fellowship of the Rings", 
    //   "asdfasdf", 
    //   "PG", 
    //   ["Angelina Jolie"], 
    //   ["Jack"], 
    //   ["Action", "Comedy"]
    // )
  ];

  constructor() { }

  getMovies(): Movie[] {
    return this.movies.slice();
  }

  getMovie(id: string): Movie {
    for (let movie of this.movies) {
      if (movie.movieId === id) {
        return movie;
      }
    }

    return null;
  }
}
