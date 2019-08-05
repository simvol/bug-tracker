import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BugComponent } from './bugs/components/bug.component';
import { LoginComponent } from './auth/components/login/login.component';
import { AuthorizedComponent } from './shared/components/authorized/authorized.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthorizedComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'bugs',
        component: BugComponent
      },
      { path: '', redirectTo: 'bugs', pathMatch: 'full' }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
