import { Component, OnInit, OnDestroy } from '@angular/core';

import { BehaviorSubject, Subscription } from 'rxjs';

import { DashboardService } from '../../services/dashboard.service';

import { ActiveIssuesComponent } from '../../components/active-issues/active-issues.component';
import { AsyncPipe } from '@angular/common';
import { Store } from '../../../../core/state/app-store';
import { DashboardFilter } from '../../../../shared/models/dto/stats/dashboard-filter';
import { StatusCounts } from '../../models';
import { DashboardRepository } from '../../repositories/dashboard.repository';


interface DateRange {
    dateStart: Date;
    dateEnd: Date;
}

@Component({
    selector: 'app-dashboard',
    templateUrl: 'dashboard.page.component.html',
    styleUrls: ['dashboard.page.component.css'],
    imports: [ActiveIssuesComponent, AsyncPipe],
    providers: [DashboardService, DashboardRepository]
})
export class DashboardPageComponent implements OnInit, OnDestroy {

    private sub: Subscription | undefined;
    public filter: DashboardFilter = {};
    public filteredDateStart: Date | undefined;
    public filteredDateEnd: Date | undefined;

    public statusCounts$: BehaviorSubject<StatusCounts> = new BehaviorSubject<StatusCounts>({
        activeItemsCount: 0,
        closeRate: 0,
        closedItemsCount: 0,
        openItemsCount: 0
    });

    private get currentUserId() {
        if (this.store.value.currentUser) {
            return this.store.value.currentUser.id;
        } else {
            return undefined;
        }
    }

    constructor(
        private dashboardService: DashboardService,
        private store: Store
    ) { }

    public ngOnInit() {
        this.refresh();
    }

    public onMonthRangeTap(months: number) {
        const range = this.getDateRange(months);
        this.filteredDateStart = range.dateStart;
        this.filteredDateEnd = range.dateEnd;
        this.filter = {
            userId: this.filter.userId,
            dateEnd: range.dateEnd,
            dateStart: range.dateStart
        };
        this.refresh();
    }

    private refresh() {
        this.sub = this.dashboardService.getStatusCounts(this.filter)
            .subscribe(result => {
                this.statusCounts$.next(result);
            });
    }


    private getDateRange(months: number): DateRange {
        const now = new Date();
        const start = new Date();
        start.setMonth(start.getMonth() - months);
        return {
            dateStart: start,
            dateEnd: now
        };
    }
    
    public ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}
