import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { NavigationService } from 'src/app/core/services';
import { BacklogService } from '../../services/backlog.service';
import { PtItem } from 'src/app/core/models/domain';
import { PresetType } from 'src/app/core/models/domain/types';

@Component({
    selector: 'app-backlog',
    templateUrl: 'backlog.page.component.html',
    styleUrls: ['backlog.page.component.css']
})
export class BacklogPageComponent implements OnInit {

    private itemsSub: Subscription | undefined;
    public items: PtItem[] = [];

    constructor(
        private activatedRoute: ActivatedRoute,
        private navigationService: NavigationService,
        private backlogService: BacklogService
    ) { }

    public ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            if (this.itemsSub) {
                this.itemsSub.unsubscribe();
            }
            const reqPreset = params['preset'] as PresetType;
            if (reqPreset) {
                this.itemsSub = this.backlogService.getItems(reqPreset)
                    .subscribe(items => this.items = items);
            }
        });
    }

    public selectListItem(item: PtItem) {
        // navigate to detail page
        this.navigationService.navigate(['/detail', item.id]);
    }
}
