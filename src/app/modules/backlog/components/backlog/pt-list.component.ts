import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { PtItem } from 'src/app/core/models/domain';
import { ItemType } from 'src/app/core/constants';
import { PriorityEnum } from 'src/app/core/models/domain/enums';
import { NgFor, NgIf, DatePipe } from '@angular/common';

@Component({
    selector: 'app-list',
    templateUrl: 'pt-list.component.html',
    styleUrls: ['pt-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgFor, NgIf, DatePipe]
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
