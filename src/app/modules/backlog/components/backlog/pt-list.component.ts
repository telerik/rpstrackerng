import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { PtItem } from 'src/app/core/models/domain';
import { ItemType } from 'src/app/core/constants';

@Component({
    selector: 'app-list',
    templateUrl: 'pt-list.component.html',
    styleUrls: ['pt-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PtListComponent {

    @Input() items: PtItem[] = [];
    @Output() listItemSelected: EventEmitter<PtItem> = new EventEmitter<PtItem>();

    public getIndicatorClass(item: PtItem): string {
        return ItemType.indicatorClassFromType(item.type);
    }

    public getIndicatorImage(item: PtItem) {
        return ItemType.imageResFromType(item.type);
    }

    public listItemTap(item: PtItem) {
        this.listItemSelected.emit(item);
    }
}
