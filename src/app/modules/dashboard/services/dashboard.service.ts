import { Injectable, NgZone } from '@angular/core';

import { Observable } from 'rxjs';

import { DashboardRepository } from '../repositories/dashboard.repository';
import { TypeCounts, PriorityCounts, StatusCounts } from '../models';
import { DashboardFilter } from '../../../shared/models/dto/stats/dashboard-filter';


@Injectable()
export class DashboardService {

    constructor(
        private repo: DashboardRepository
    ) { }

    public getStatusCounts(filter: DashboardFilter): Observable<StatusCounts> {
        return this.repo.getStatusCounts(filter);
    }

    public getPriorityCounts(filter: DashboardFilter): Observable<PriorityCounts> {
        return this.repo.getPriorityCounts(filter);
    }

    public getTypeCounts(filter: DashboardFilter): Observable<TypeCounts> {
        return this.repo.getTypeCounts(filter);
    }
}
