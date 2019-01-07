import { DetailSectionSelectorComponent } from './detail/detail-section-selector/detail-section-selector.component';
import { PtListComponent, PtListItemComponent } from './backlog';
import { PtItemDetailsComponent } from './detail/item-details/pt-item-details.component';
import { PtItemTasksComponent } from './detail/item-tasks/pt-item-tasks.component';

export * from './backlog';
export * from './detail/detail-section-selector/detail-section-selector.component';
export * from './detail/item-details/pt-item-details.component';
export * from './detail/item-tasks/pt-item-tasks.component';

export const COMPONENTS = [
    DetailSectionSelectorComponent,
    PtItemDetailsComponent,
    PtListComponent,
    PtListItemComponent,
    PtItemTasksComponent
];
