import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BacklogRoutingModule } from './backlog.routing';
import { BacklogService } from './services/backlog.service';
import { BacklogRepository } from './repositories/backlog.repository';
import { PAGES } from './pages';
import { COMPONENTS } from './components';


@NgModule({
    imports: [
    CommonModule,
    BacklogRoutingModule,
    ...PAGES,
    ...COMPONENTS
],
    exports: [
        ...PAGES
    ],
    providers: [
        BacklogRepository,
        BacklogService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class BacklogModule { }
