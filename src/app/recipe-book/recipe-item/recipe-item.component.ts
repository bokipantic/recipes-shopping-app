import { Component, Input, OnInit } from '@angular/core';

import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() item: Recipe;
  @Input() id: number;

  constructor() { }

  ngOnInit(): void {
  }


}
