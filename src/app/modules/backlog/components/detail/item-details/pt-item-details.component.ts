import { Component, OnInit, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';

import { PtItem } from 'src/app/core/models/domain';
import { PtItemDetailsEditFormModel, ptItemToFormModel } from 'src/app/shared/models/forms';
import { PtItemType } from 'src/app/core/models/domain/types';
import { PriorityEnum } from 'src/app/core/models/domain/enums';
import { ItemType, PT_ITEM_STATUSES, PT_ITEM_PRIORITIES } from 'src/app/core/constants';

@Component({
    selector: 'app-item-details',
    templateUrl: 'pt-item-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PtItemDetailsComponent implements OnInit {

    @Input() item: PtItem | undefined;
    @Output() itemSaved = new EventEmitter<PtItem>();

    private selectedTypeValue: PtItemType | undefined;
    private selectedPriorityValue: PriorityEnum | undefined;

    public itemForm: PtItemDetailsEditFormModel | undefined;
    public itemTypesProvider = ItemType.List.map((t) => t.PtItemType);
    public statusesProvider = PT_ITEM_STATUSES;
    public prioritiesProvider = PT_ITEM_PRIORITIES;

    constructor() { }

    public ngOnInit() {
        if (this.item) {
            this.itemForm = ptItemToFormModel(this.item);
            this.selectedTypeValue = <PtItemType>this.itemForm.typeStr;
            this.selectedPriorityValue = <PriorityEnum>this.itemForm.priorityStr;
        }
    }

    public onBlurTextField() {
        this.notifyUpdateItem();
    }

    public onDropdownChange() {
        this.notifyUpdateItem();
    }

    private notifyUpdateItem() {
        const updatedItem = this.getUpdatedItem();
        this.itemSaved.emit(updatedItem);
    }

    private getUpdatedItem(): PtItem | undefined {
        // const updatedAssignee = this.reselectedAssignee ? this.reselectedAssignee : this.item.assignee;

        if (!this.itemForm) {
            return undefined;
        }
        const updatedItem = Object.assign({}, this.item, {
            title: this.itemForm.title,
            description: this.itemForm.description,
            type: this.itemForm.typeStr,
            status: this.itemForm.statusStr,
            priority: this.itemForm.priorityStr,
            estimate: this.itemForm.estimate,
            // assignee: updatedAssignee
        });
        return updatedItem;
    }


}
