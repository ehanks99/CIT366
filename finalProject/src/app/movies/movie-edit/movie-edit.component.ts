import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Movie } from '../movie.model';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {
  @ViewChild('form', { static: false }) movieForm: NgForm;
  genres: string[] = 
    [ "Action", "Adventure", "Comedy", "Crime", "Drama", "Fantasy", /* 6 */
      "Historical", "Horror", "Mystery", "Philosophical", /* 4 */
      "Political", "Romance", "Saga", "Satire", "Science fiction", "Social", /* 6 */
      "Thriller", "Urban", "Western", "Animation" ]; /* 4 */
  // the array determining if genre checkbox is checked or not
  checked: boolean[] = [false, false, false, false, false, 
                        false, false, false, false, false, 
                        false, false, false, false, false, 
                        false, false, false, false, false ];

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

        // check the checkboxes where the movie genre == the genre
        this.movie.genres.forEach((genre, index) => {
          let i = this.genres.indexOf(genre); // this should never be -1
          this.checked[i] = true;
        });
      }
    );
  }

  onSubmit() {
    const values = this.movieForm.value;
    console.log(values);

    let selectedGenres: string[] = [];
    // need to find which genres were selected
    for (let index in this.checked) {
      if (this.checked[index]) {
        selectedGenres.push(this.genres[index]);
      }
    }
    // console.log(selectedGenres);
    
    // need to copy the separate values of the actors into the actor array
    for (let index in this.movie.actors) {
      let string = "actors[" + index + "]";
      this.movie.actors[index] = values[string];
    }

    // need to copy the separate values of the directors into the director array
    for (let index in this.movie.directors) {
      let string = "directors[" + index + "]";
      this.movie.directors[index] = values[string];
    }

    // need to copy the separate values of the genres into the genre array
    for (let index in this.movie.genres) {
      let string = "genres[" + index + "]";
      this.movie.genres[index] = values[string];
    }

    // const newContact = new Contact('', values.name, values.email, values.phone, values.imageUrl, this.groupContacts);

    // if (this.editMode === true) {
    //   this.contactService.updateContact(this.originalContact, newContact);
    // } else {
    //   this.contactService.addContact(newContact);
    // }

    // this.onCancel();
  }

  onCancel() {
    this.router.navigate(["/movies"]);
  }
  
  customTrackBy(index: number, obj: any): any {
    return index;
  }

  onDeleteActor(index: number) {
    // If actor is outside of the array bounds
    if (index < 0 || index >= this.movie.actors.length) {
      return;
    }

    this.movie.actors.splice(index, 1);
  }

  onAddActor() {
    this.movie.actors.push("");
  }

  onDeleteDirector(index: number) {
    // If director is outside of the array bounds
    if (index < 0 || index >= this.movie.directors.length) {
      return;
    }

    this.movie.directors.splice(index, 1);
  }

  onAddDirector() {
    this.movie.directors.push("");
  }
}
