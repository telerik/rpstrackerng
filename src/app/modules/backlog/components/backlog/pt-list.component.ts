import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

import { DatePipe } from '@angular/common';
import { ItemType } from '../../../../core/constants';
import { PtItem } from '../../../../core/models/domain';
import { PriorityEnum } from '../../../../core/models/domain/enums';

@Component({
    selector: 'app-list',
    templateUrl: 'pt-list.component.html',
    styleUrls: ['pt-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [DatePipe]
})
export class PtListComponent {

    @Input() items: PtItem[] = [];
    @Output() listItemSelected: EventEmitter<PtItem> = new EventEmitter<PtItem>();

    public getIndicatorClass(item: PtItem): string {
        return ItemType.indicatorClassFromType(item.type);
    }

    public getPriorityClass(item: PtItem): string {
        const indicatorClass = PriorityEnum.getIndicatorClass(item.priority);
        return indicatorClass;
    }

    public getIndicatorImage(item: PtItem) {
        return ItemType.imageResFromType(item.type);
    }

    public listItemTap(item: PtItem) {
        this.listItemSelected.emit(item);
    }
}
