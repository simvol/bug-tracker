import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BugComponent } from './bugs/components/bug/bug.component';
import { LoginComponent } from './auth/components/login/login.component';
import { AuthorizedComponent } from './shared/components/authorized/authorized.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { DashboardComponent } from './bugs/components/dashboard/dashboard.component';
import { ExploreComponent } from './bugs/components/explore/explore.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorizedComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'bugs',
        component: BugComponent
      },
      {
        path: 'explore',
        component: ExploreComponent
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
