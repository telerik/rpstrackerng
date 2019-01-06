import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment as env } from '../../../environments/environment';
import { PtUser } from '../../core/models/domain';
import { Store } from '../state/app-store';

@Injectable()
export class PtUserService {

    private getUsersUrl(nameFilter: string): string {
        let url = `${env.apiEndpoint}/users`;
        if (nameFilter) {
            url = url + '?name=' + nameFilter;
        }
        return url;
    }

    constructor(
        private http: HttpClient,
        private store: Store
    ) { }

    public fetchUsers(nameFilter: string) {
        // tslint:disable-next-line:no-debugger
        debugger;
        this.http.get<PtUser[]>(this.getUsersUrl(nameFilter))
            .subscribe((data: PtUser[]) => {
                data.forEach(u => {
                    u.avatar = `${env.apiEndpoint}/photo/${u.id}`;
                });
                this.store.set('users', data);
            });
    }
}
