import { DetailSectionSelectorComponent } from './detail/detail-section-selector/detail-section-selector.component';
import { PtListComponent, PtListItemComponent } from './backlog';
import { PtItemDetailsComponent } from './detail/item-details/pt-item-details.component';

export * from './backlog';
export * from './detail/detail-section-selector/detail-section-selector.component';
export * from './detail/item-details/pt-item-details.component';

export const COMPONENTS = [
    DetailSectionSelectorComponent,
    PtItemDetailsComponent,
    PtListComponent,
    PtListItemComponent,
];
