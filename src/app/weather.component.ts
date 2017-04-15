import { Component, OnInit } from '@angular/core';

import { Weather }        from './weather';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  weatherArray: Weather[];

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
  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.getWeatherArray();

    this.getWeather();
  }

  getWeatherArray(): void {
    this.weatherService.getWeatherReports(this.user.weatherSettings)
      .then(weather => {
        this.weatherArray = weather;
        console.log(this);
      })
      .catch(res => {
        console.log(res);
        this.weatherError = 'There was an error retrieving weather data.';
      })
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
