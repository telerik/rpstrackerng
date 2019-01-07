import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription, BehaviorSubject } from 'rxjs';

import { NavigationService } from 'src/app/core/services';
import { BacklogService } from '../../services/backlog.service';
import { PtItem } from 'src/app/core/models/domain';
import { PresetType } from 'src/app/core/models/domain/types';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PtNewItem } from 'src/app/shared/models/dto';
import { EMPTY_STRING } from 'src/app/core/helpers';
import { ItemType } from 'src/app/core/constants';
import { Store } from 'src/app/core/state/app-store';

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
        private modalService: NgbModal,
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

    public onAddTap(content: any) {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
            if (typeof result === 'object') {
                if (this.store.value.currentUser) {
                    this.backlogService.addNewPtItem(result, this.store.value.currentUser)
                        .then(nextItem => {
                            this.items$.next([nextItem, ...this.items$.value]);
                        });
                }
                this.resetModalFields();
            }
        }, (reason) => {

        });
    }
}
