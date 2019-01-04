import { Component, OnInit, OnDestroy } from '@angular/core';

import { DetailScreenType } from 'src/app/shared/models/ui/types/detail-screens';
import { Observable, Subscription } from 'rxjs';
import { PtItem } from 'src/app/core/models/domain';
import { ActivatedRoute } from '@angular/router';
import { BacklogService } from '../../services/backlog.service';
import { PtUserService, NavigationService } from 'src/app/core/services';
import { Store } from 'src/app/core/state/app-store';

@Component({
    selector: 'app-backlog-detail-page',
    templateUrl: 'detail.page.component.html'
})
export class DetailPageComponent implements OnInit, OnDestroy {


    private itemId = 0;
    private currentItemSub: Subscription;
    public selectedDetailsScreen: DetailScreenType = 'details';
    public currentSelectedItem$: Observable<PtItem> = this.store.select<PtItem>('currentSelectedItem');

    public item?: PtItem;

    constructor(
        private activatedRoute: ActivatedRoute,
        private backlogService: BacklogService,
        private ptUserService: PtUserService,
        private navigationService: NavigationService,
        private store: Store
    ) {
        this.currentItemSub = this.currentSelectedItem$.subscribe(i => {
            this.item = i;
        });
    }

    public ngOnInit() {
        this.itemId = parseInt(this.activatedRoute.snapshot.params['id'], undefined);
        this.backlogService.getItemFromCacheOrServer(this.itemId);

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

    public ngOnDestroy(): void {
        this.currentItemSub.unsubscribe();
    }
}
