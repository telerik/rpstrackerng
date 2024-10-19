import { DetailSectionSelectorComponent } from './detail/detail-section-selector/detail-section-selector.component';
import { PtListComponent, PtListItemComponent } from './backlog';
import { PtItemFormComponent } from './detail/item-form/pt-item-form.component';
import { PtItemTasksComponent } from './detail/item-tasks/pt-item-tasks.component';
import { PtItemChitchatComponent } from './detail/item-chitchat/pt-item-chitchat.component';

export * from './backlog';
export * from './detail/detail-section-selector/detail-section-selector.component';
export * from './detail/item-form/pt-item-form.component';
export * from './detail/item-tasks/pt-item-tasks.component';
export * from './detail/item-chitchat/pt-item-chitchat.component';

export const COMPONENTS = [
    DetailSectionSelectorComponent,
    PtItemFormComponent,
    PtListComponent,
    PtListItemComponent,
    PtItemTasksComponent,
    PtItemChitchatComponent
];
