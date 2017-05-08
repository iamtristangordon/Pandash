import { Injectable, Inject } from '@angular/core';

import { Subject } from 'rxjs/Subject';

@Injectable()
//the purpose of this service is to offer an alert component
//that is accesible by all components, in order to display an alert
//to the user

export class AlertService {
    private alert = new Subject<any>();

    //subject above as an observable, hides source identity i.e. no .next()
    notification = this.alert.asObservable();

    constructor() {}

    public sendAlert (data: any) {
        if (data) {
            this.alert.next(data);
        }
    }
}