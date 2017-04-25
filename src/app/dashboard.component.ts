import { Component, OnInit } from '@angular/core';

import { Weather } 		  from './weather';
import { WeatherService } from './weather.service';
import { CitySelectService } from './city-select.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  	weather: Weather;

  	weatherError;

  	user = {
		weatherSettings: {
  			lat: '36.16589',
  			lon: '-86.784439',
  			units: 'imperial'
		},
		info: {
			name: 'Tristan',
		}
  	};

	greeting = "Hello, " + this.user.info.name + ".";

	constructor(private weatherService: WeatherService) { }

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

}
