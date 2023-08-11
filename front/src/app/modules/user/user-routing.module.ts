import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { AccountCreatedComponent } from './pages/account-created/account-created.component';

const routes: Routes = [
  {
    path: 'signup',
    component: SignUpComponent,
    children: [

    ],
  },
  {
    path: 'accountCreated',
    component: AccountCreatedComponent,
    children: [

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
