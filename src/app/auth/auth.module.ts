import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { SharedModule } from '../share-between/shared.module';

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    FormsModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: AuthComponent }
    ])
  ]
})
export class AuthModule { }
