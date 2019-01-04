import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BacklogRoutingModule } from './backlog.routing';
import { BacklogService } from './services/backlog.service';
import { BacklogRepository } from './repositories/backlog.repository';
import { PAGES } from './pages';
import { COMPONENTS } from './components';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        BacklogRoutingModule,
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
export class BacklogModule { }
