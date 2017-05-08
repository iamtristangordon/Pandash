import { Component, OnInit } from '@angular/core';

import { AlertService } from '../_services/alert.service';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  subscription: Subscription;

  alertText: string;

  showAlert = false;

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

    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
      this.alertText = '';
    }, 3000);
  }

}
