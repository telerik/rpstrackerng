import { Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BacklogPageComponent, DetailPageComponent } from './modules/backlog/pages';
import { DashboardPageComponent } from './modules/dashboard/pages';

export const routes: Routes = [
    { path: '',   redirectTo: '/dashboard', pathMatch: 'full' }, 
    { path: 'dashboard', component: DashboardPageComponent },
    { path: 'backlog', redirectTo: '/backlog/open', pathMatch: 'full' },
    { path: 'backlog/:preset', component: BacklogPageComponent },
    { path: 'detail/:id', component: DetailPageComponent },
    { path: 'detail/:id/form', redirectTo: '/detail/:id', pathMatch: 'full' },
    { path: 'detail/:id/:screen', component: DetailPageComponent },
    { path: '**', component: PageNotFoundComponent }
  ];