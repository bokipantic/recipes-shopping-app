import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { SharedModule } from '../share-between/shared.module';
import { AuthGuardService } from '../auth/auth-guard.service';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingListEditComponent
  ],
  imports: [
    FormsModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: ShoppingListComponent, canActivate: [AuthGuardService] }
    ])
  ]
})
export class ShoppingListModule { }
