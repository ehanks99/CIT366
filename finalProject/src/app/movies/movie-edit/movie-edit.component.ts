import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Movie } from '../movie.model';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {
  originalMovie: Movie;
  movie: Movie = null;
  editMode: boolean = false;

  constructor(private movieService: MovieService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        const id = params['id'];

        if (!id) {
          this.editMode = false;
          return;
        }

        this.originalMovie = this.movieService.getMovie(id);
        if (!this.originalMovie) {
          return;
        }

        this.editMode = true;
        this.movie = JSON.parse(JSON.stringify(this.originalMovie));

        // if (this.contact.group) {
        //   this.groupContacts = this.contact.group.slice();
        //   this.hasGroup = true;
        // }
      }
    );
  }

}
