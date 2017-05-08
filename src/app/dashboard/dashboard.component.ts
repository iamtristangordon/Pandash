import { Component, OnInit } from '@angular/core';

import { Weather } 		  from '../_models/weather';
import { WeatherService } from '../_services/weather.service';

import { CitySelectService } from '../_services/city-select.service';
import { AlertService } from '../_services/alert.service';

import { User } from '../_models/user';

import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  	weather: Weather;

  	weatherError;

	private alertStream = new Subject<string>();
	  
	//TODO define mongoose user schema, implement mongodb
  	user: User = {
		weatherSettings: {
  			lat: '36.16589',
  			lon: '-86.784439',
  			units: 'imperial'
		},
		_id:'x123',
		fName: 'Tristan',
		lName: 'Gordon',
		password: 'x',
    	username: 'tgordon',
    	isAdmin: true
  	};

	greeting = "Hello, " + this.user.fName + ".";

	constructor(
		private weatherService: WeatherService,
		private alertService: AlertService
		) { }

  	ngOnInit(): void {
  		this.getWeather();
  	}

  	getWeather(): void {
		this.weatherService.getWeatherReport(this.user.weatherSettings)
			.then(weather => { 
				this.weather = weather;
			})
			.catch((res) => {
				this.weatherError = 'There was an error retrieving weather data.'; 
			});
	}

	sendAlert() {
		this.alertService.sendAlert({alert: 'check this out'});
	}

}
