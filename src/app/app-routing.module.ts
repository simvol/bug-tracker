import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BugComponent } from './bugs/components/bug.component';
import { LoginComponent } from './auth/components/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'bugs',
    component: BugComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
