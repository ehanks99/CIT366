import { Pipe, PipeTransform } from '@angular/core';

import { Movie } from './movie.model';

@Pipe({
  name: 'moviesFilter'
})
export class MoviesFilterPipe implements PipeTransform {

  transform(movies: Movie[], term: string): Movie[] {
    if (!term || term === ""){
      return movies;
    }

    let filteredArray: Movie[] = [];
    filteredArray = movies.filter(
      (movie: Movie) => 
        movie.name.toLowerCase().includes(term.toLowerCase())
    );

    if (filteredArray.length < 1) {
      return movies;
    }
    
    return filteredArray;
  }
}
