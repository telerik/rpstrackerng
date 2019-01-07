import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BacklogPageComponent, DetailPageComponent } from './pages';

const routes: Routes = [
    {
        path: 'backlog/:preset',
        component: BacklogPageComponent,
        // canActivate: [AuthGuard]
    },
    {
        path: 'detail/:id', redirectTo: 'detail/:id/details'
    },
    {
        path: 'detail/:id/:screen', component: DetailPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BacklogRoutingModule { }
