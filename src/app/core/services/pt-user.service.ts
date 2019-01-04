import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment as env } from '../../../environments/environment';
import { PtUser } from '../../core/models/domain';
import { Store } from '../state/app-store';

@Injectable()
export class PtUserService {

    private get usersUrl() { return `${env.apiEndpoint}/users`; }

    constructor(
        private http: HttpClient,
        private store: Store
    ) { }

    public fetchUsers() {
        this.http.get<PtUser[]>(this.usersUrl)
            .subscribe((data: PtUser[]) => {
                data.forEach(u => {
                    u.avatar = `${env.apiEndpoint}/photo/${u.id}`;
                });
                this.store.set('users', data);
            });
    }
}
