import { Component, OnInit } from '@angular/core';

import { Weather } 		  from './weather';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  	weather: Weather;

  	weatherError;

  	weatherSettings = {
  		lat: '36.16589',
  		lon: '-86.784439',
  		units: 'imperial'
  	};

	constructor(private weatherService: WeatherService) { }

  	ngOnInit(): void {
  		this.getWeather();
  	}

  	getWeather(): void {
		this.weatherService.getWeatherReport(this.weatherSettings)
			.then(weather => { 
				this.weather = weather;
				console.log(this);
			})
			.catch((res) => {
				console.log(res);
				this.weatherError = 'There was an error retrieving weather data.'; 
			});
	}

}
