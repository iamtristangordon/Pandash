import { Injectable, Inject } from '@angular/core';

import { Subject } from 'rxjs/Subject';

@Injectable()
//the purpose of this service is to create a notification 
//system between the weather component and the cities-search component

export class CitySelectService {
    private notify = new Subject<any>();

    //subject above as an observable, hides source identity i.e. no .next()
    notification = this.notify.asObservable();

    constructor() {}

    public sendNotification (data: any) {
        if (data) {
            this.notify.next(data);
        }
    }
}