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

	constructor(private weatherService: WeatherService) { }

  	ngOnInit(): void {
  		this.getWeather();

  		console.log(this.weather);
  	}

  	getWeather(): void {
		this.weatherService.getWeatherReport()
			.then(weather => { 
				this.weather = weather;
				console.log(this);
			});
	}

}
