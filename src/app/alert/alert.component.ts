import { Component, OnInit } from '@angular/core';

import { trigger, state, animate, transition, style } from '@angular/animations';

import { AlertService } from '../_services/alert.service';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  animations: [
    trigger('toggleState', [
      state('inactive', style({top: '-90px' })),
      state('active', style({top: '20px'})),
      transition('inactive => active', animate('400ms')),
      transition('active => inactive', animate('200ms')),
    ])
  ],
})
export class AlertComponent implements OnInit {
  subscription: Subscription;

  alertText: string;

  toggleAlert = 'inactive';

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.subscription = this.alertService.notification.subscribe((res) => {
      if(res.hasOwnProperty('alert')) {
        this.alert(res.alert);
      }
    })
  }

  alert(text) {
    this.alertText = text;

    this.toggleAlert = 'active';

    setTimeout(() => {
      this.toggleAlert = 'inactive';
      this.alertText = '';
    }, 3000);
  }

}
