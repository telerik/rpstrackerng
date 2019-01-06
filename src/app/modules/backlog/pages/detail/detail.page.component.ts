import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { DetailScreenType } from 'src/app/shared/models/ui/types/detail-screens';
import { PtItem } from 'src/app/core/models/domain';
import { BacklogService } from '../../services/backlog.service';
import { PtUserService, NavigationService } from 'src/app/core/services';

@Component({
    selector: 'app-backlog-detail-page',
    templateUrl: 'detail.page.component.html'
})
export class DetailPageComponent implements OnInit, OnDestroy {

    private itemId = 0;
    private currentItemSub: Subscription | undefined;
    public selectedDetailsScreen: DetailScreenType = 'details';

    public item: PtItem | undefined;

    constructor(
        private activatedRoute: ActivatedRoute,
        private backlogService: BacklogService,
        private ptUserService: PtUserService,
        private navigationService: NavigationService
    ) { }

    public ngOnInit() {

        this.itemId = parseInt(this.activatedRoute.snapshot.params['id'], undefined);

        this.currentItemSub = this.backlogService.getPtItem(this.itemId)
            .subscribe(item => this.item = item);

        const screen = this.activatedRoute.snapshot.params['screen'] as DetailScreenType;
        if (screen === 'details' || screen === 'tasks' || screen === 'chitchat') {
            this.selectedDetailsScreen = screen;
        } else {
            this.navigationService.navigate([`/detail/${this.itemId}/details`]);
        }
    }

    public onScreenSelected(screen: DetailScreenType) {
        this.selectedDetailsScreen = screen;
        this.navigationService.navigate([`/detail/${this.itemId}/${screen}`]);
    }

    public onUsersRequested(name: string) {
        this.ptUserService.fetchUsers(name);
    }

    public onItemSaved(item: PtItem) {
        this.currentItemSub = this.backlogService.updatePtItem(item)
            .subscribe(updateItem => {
                this.item = updateItem;
            });
    }

    public ngOnDestroy(): void {
        if (this.currentItemSub) {
            this.currentItemSub.unsubscribe();
        }
    }
}
