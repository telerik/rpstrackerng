import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { PtItem } from 'src/app/core/models/domain';

@Component({
    selector: 'app-list-item',
    templateUrl: 'pt-list-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PtListItemComponent {

    @Input() item?: PtItem;

}
