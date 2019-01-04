import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, BehaviorSubject } from 'rxjs';

import { NavigationService } from 'src/app/core/services';
import { BacklogService } from '../../services/backlog.service';
import { Store } from 'src/app/core/state/app-store';
import { PtItem } from 'src/app/core/models/domain';
import { PresetType } from 'src/app/core/models/domain/types';

@Component({
    selector: 'app-backlog',
    templateUrl: 'backlog.page.component.html'
})

export class BacklogPageComponent implements OnInit {

    public items$ = this.store.select<PtItem[]>('backlogItems');
    public selectedPreset$: Observable<PresetType> = this.store.select<PresetType>('selectedPreset');
    public isListRefreshing$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(
        private activatedRoute: ActivatedRoute,
        private navigationService: NavigationService,
        private backlogService: BacklogService,
        private store: Store
    ) { }

    public ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            const reqPreset = params['preset'];
            if (reqPreset) {
                this.store.set('selectedPreset', reqPreset);
            }
        });

        this.selectedPreset$.subscribe(next => {
            this.backlogService.fetchItems();
        });
    }

    public selectListItem(item: PtItem) {
        // navigate to detail page
        this.navigationService.navigate(['/detail', item.id]);
    }

}
