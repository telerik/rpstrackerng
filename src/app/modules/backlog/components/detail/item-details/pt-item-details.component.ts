import { Component, OnInit, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';

import { PtItem, PtUser } from 'src/app/core/models/domain';
import { PtItemDetailsEditFormModel, ptItemToFormModel } from 'src/app/shared/models/forms';
import { PtItemType } from 'src/app/core/models/domain/types';
import { PriorityEnum } from 'src/app/core/models/domain/enums';
import { ItemType, PT_ITEM_STATUSES, PT_ITEM_PRIORITIES } from 'src/app/core/constants';
import { Observable } from 'rxjs';
import { Store } from 'src/app/core/state/app-store';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-item-details',
    templateUrl: 'pt-item-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PtItemDetailsComponent implements OnInit {

    @Input() item: PtItem | undefined;
    @Output() itemSaved = new EventEmitter<PtItem>();
    @Output() usersRequested = new EventEmitter<string>();

    public users$: Observable<PtUser[]> = this.store.select<PtUser[]>('users');

    private selectedTypeValue: PtItemType | undefined;
    private selectedPriorityValue: PriorityEnum | undefined;
    private selectedAssignee: PtUser | undefined;

    public itemForm: PtItemDetailsEditFormModel | undefined;
    public itemTypesProvider = ItemType.List.map((t) => t.PtItemType);
    public statusesProvider = PT_ITEM_STATUSES;
    public prioritiesProvider = PT_ITEM_PRIORITIES;

    closeResult = '';

    constructor(
        private store: Store,
        private modalService: NgbModal
    ) { }

    public ngOnInit() {
        if (this.item) {
            this.itemForm = ptItemToFormModel(this.item);
            this.selectedTypeValue = <PtItemType>this.itemForm.typeStr;
            this.selectedPriorityValue = <PriorityEnum>this.itemForm.priorityStr;
            this.selectedAssignee = this.item.assignee;
        }
    }

    public onBlurTextField() {
        this.notifyUpdateItem();
    }

    public onDropdownChange() {
        this.notifyUpdateItem();
    }

    public assigneePickerOpen(content: any) {
        this.usersRequested.emit();
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
            if (typeof result === 'object' && this.itemForm) {
                this.selectedAssignee = result;
                this.itemForm.assigneeName = (result as PtUser).fullName;
                this.notifyUpdateItem();
            }
        }, (reason) => {

        });
    }

    private notifyUpdateItem() {
        const updatedItem = this.getUpdatedItem();
        this.itemSaved.emit(updatedItem);
    }

    private getUpdatedItem(): PtItem | undefined {

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
            assignee: this.selectedAssignee
        });
        return updatedItem;
    }


}
