import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { BacklogRepository } from '../backlog/repositories/backlog.repository';
import { BacklogService } from '../backlog/services/backlog.service';
import { PAGES } from './pages';
import { COMPONENTS } from './components';


@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        SharedModule
    ],
    exports: [
        ...PAGES
    ],
    declarations: [
        ...PAGES,
        ...COMPONENTS,
    ],
    providers: [
        BacklogRepository,
        BacklogService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class DashboardModule { }
