import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription, BehaviorSubject } from 'rxjs';


import { NgFor, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../../../shared/components/modal-dialog/modal-dialog.component';
import { PtListComponent } from '../../components/backlog/pt-list.component';
import { PresetFilterComponent } from '../../../../shared/components/preset-filter/preset-filter.component';
import { ItemType } from '../../../../core/constants';
import { EMPTY_STRING } from '../../../../core/helpers';
import { PtItem } from '../../../../core/models/domain';
import { PriorityEnum } from '../../../../core/models/domain/enums';
import { PresetType } from '../../../../core/models/domain/types';
import { NavigationService } from '../../../../core/services';
import { Store } from '../../../../core/state/app-store';
import { PtNewItem } from '../../../../shared/models/dto';
import { ModalService } from '../../../../shared/services/modal.service';
import { BacklogService } from '../../services/backlog.service';
import { BacklogRepository } from '../../repositories/backlog.repository';

@Component({
    selector: 'app-backlog',
    templateUrl: 'backlog.page.component.html',
    styleUrls: ['backlog.page.component.css'],
    standalone: true,
    imports: [PresetFilterComponent, PtListComponent, ModalComponent, FormsModule, NgFor, AsyncPipe],
    providers: [BacklogService, BacklogRepository]
})
export class BacklogPageComponent implements OnInit {

    private itemsSub: Subscription | undefined;
    public items$: BehaviorSubject<PtItem[]> = new BehaviorSubject<PtItem[]>([]);
    public currentPreset: PresetType = 'open';
    public itemTypesProvider = ItemType.List.map((t) => t.PtItemType);
    public newItem: PtNewItem | undefined;

    constructor(
        private activatedRoute: ActivatedRoute,
        private navigationService: NavigationService,
        private backlogService: BacklogService,
        private modalService: ModalService,
        private store: Store
    ) { }

    public ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            if (this.itemsSub) {
                this.itemsSub.unsubscribe();
            }
            const reqPreset = params['preset'] as PresetType;
            if (reqPreset) {
                this.itemsSub = this.backlogService.getItems(this.currentPreset)
                    .subscribe(items => {
                        this.items$.next(items);
                    });
            }
        });
        this.resetModalFields();
    }

    private resetModalFields() {
        this.newItem = {
            title: EMPTY_STRING,
            description: EMPTY_STRING,
            type: 'PBI'
        };
    }

    public getIndicatorImage(item: PtItem): string {
        return ItemType.imageResFromType(item.type);
    }

    public getPriorityClass(item: PtItem): string {
        const indicatorClass = PriorityEnum.getIndicatorClass(item.priority);
        return indicatorClass;
    }

    public selectListItem(item: PtItem) {
        // navigate to detail page
        this.navigationService.navigate(['/detail', item.id]);
    }

    public onAddTap(id: string) {
        this.openModal(id);
    }

    onSaveTap(newItem: PtNewItem, id: string) {
        if (typeof newItem === 'object') {
            if (this.store.value.currentUser) {
                this.backlogService.addNewPtItem(newItem, this.store.value.currentUser)
                    .then(nextItem => {
                        this.items$.next([nextItem, ...this.items$.value]);
                    });
            }
            this.closeModal(id);
        }
    }

    openModal(id: string) {
        this.modalService.open(id);
    }
    
    closeModal(id: string) {
        this.modalService.close(id);
        this.resetModalFields();
    }
}
