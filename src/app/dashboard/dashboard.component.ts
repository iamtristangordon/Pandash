import { Component, OnInit } from '@angular/core';

import { Weather } 		  from '../_models/weather';
import { WeatherService } from '../_services/weather.service';
import { CitySelectService } from '../_services/city-select.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  	weather: Weather;

  	weatherError;
	  
	//TODO define mongoose user schema, implement mongodb
  	user = {
		weatherSettings: {
  			lat: '36.16589',
  			lon: '-86.784439',
  			units: 'imperial'
		},
		lName: 'Tristan',
  	};

	greeting = "Hello, " + this.user.lName + ".";

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
