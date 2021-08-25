import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { SharedModule } from '../share-between/shared.module';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingListEditComponent
  ],
  imports: [
    FormsModule,
    SharedModule
  ]
})
export class ShoppingModule { }
