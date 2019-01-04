import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ServerErrorHandlerService {
    public handleHttpError(error: any) {
        return Observable.throw(error.json().error || 'Server error');
    }
}
