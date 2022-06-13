import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription, BehaviorSubject } from 'rxjs';

import { NavigationService } from 'src/app/core/services';
import { BacklogService } from '../../services/backlog.service';
import { PtItem } from 'src/app/core/models/domain';
import { PresetType } from 'src/app/core/models/domain/types';
import { PtNewItem } from 'src/app/shared/models/dto';
import { EMPTY_STRING } from 'src/app/core/helpers';
import { ItemType } from 'src/app/core/constants';
import { Store } from 'src/app/core/state/app-store';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
    selector: 'app-backlog',
    templateUrl: 'backlog.page.component.html',
    styleUrls: ['backlog.page.component.css']
})
export class BacklogPageComponent implements OnInit {

    private itemsSub: Subscription | undefined;
    public items$: BehaviorSubject<PtItem[]> = new BehaviorSubject<PtItem[]>([]);

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
                this.itemsSub = this.backlogService.getItems(reqPreset)
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
