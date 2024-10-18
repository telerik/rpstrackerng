import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard.routing';


import { DashboardRepository } from './repositories/dashboard.repository';
import { DashboardService } from './services/dashboard.service';
import { PAGES } from './pages';
import { COMPONENTS } from './components';



@NgModule({
    imports: [
    CommonModule,
    DashboardRoutingModule,
    ...PAGES,
    ...COMPONENTS
],
    exports: [
        ...PAGES
    ],
    providers: [
        DashboardRepository,
        DashboardService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class DashboardModule { }
