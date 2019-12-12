import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MoviesComponent } from './movies/movies.component';
import { MovieDetailComponent } from './movies/movie-detail/movie-detail.component';
import { MovieEditComponent } from './movies/movie-edit/movie-edit.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  { path: 'movies', component: MoviesComponent, children: [
    // { path: '', component: DocumentStartComponent, pathMatch: 'full' },
    { path: 'new', component: MovieEditComponent },
    { path: ':id', component: MovieDetailComponent }, //, resolve: [DocumentsResolverService] },
    { path: ':id/edit', component: MovieEditComponent } //, resolve: [DocumentsResolverService] }
  ]}
]; 

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
