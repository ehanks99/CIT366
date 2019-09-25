import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe("Meat Meal", "yummy food here", "https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg"),
    new Recipe("Meat Meal", "yummy food here", "https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg")
  ];

  constructor() { }

  ngOnInit() {
  }

}
