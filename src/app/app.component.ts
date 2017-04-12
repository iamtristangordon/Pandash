import { Component, OnInit } from '@angular/core';

import { Weather } from './weather';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  	title = 'Pandash';

  	weather: Weather;

  	weatherError;

  	weatherSettings = {
  		lat: '36.117237',
  		lon: '-86.628691',
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
