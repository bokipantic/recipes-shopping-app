import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppingListService } from 'src/app/share-between/shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  editMode = false;
  editIndex: number;
  editIngredient: Ingredient;
  private editSubcription: Subscription;
  
  constructor(private shoppingService: ShoppingListService) { }

  ngOnInit(): void {
    this.editSubcription = this.shoppingService.startEditing.subscribe(
      (index: number) => {
        this.editIndex = index;
        this.editMode = true;
        this.editIngredient = this.shoppingService.getIngredient(index);
        this.slForm.setValue({
          name: this.editIngredient.name,
          amount: this.editIngredient.amount
        });
      }
    );
  }

  ngOnDestroy() {
    this.editSubcription.unsubscribe();
  }

  onAddOrEditIngredient(form: NgForm) {
    const newOrEditedIngr = new Ingredient(form.value.name, form.value.amount);
    if (this.editMode) {
      this.shoppingService.editIngredient(this.editIndex, newOrEditedIngr);
    } else {
      this.shoppingService.addIngredient(newOrEditedIngr);
    }
    form.reset();
    this.editMode = false;
  }
  // onAddOrEditIngredient(name, amount) {
  //   this.shoppingService.addIngredient(new Ingredient(name.value, amount.value));
  // }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingService.deleteIngredient(this.editIndex);
    this.onClear();
  }
}
