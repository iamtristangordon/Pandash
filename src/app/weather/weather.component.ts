import { Component, OnInit } from '@angular/core';

import { Weather }        from '../_models/weather';
import { WeatherService } from '../_services/weather.service';

import { CitySelectService } from '../_services/city-select.service';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  weatherArray: Weather[];

  weather: Weather;

  subscription: Subscription;

  weatherError: string;

  weatherArrayError: string;

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
  constructor(
    private weatherService: WeatherService,
    private citySelectService: CitySelectService) { }

  ngOnInit() {
    this.getWeatherArray();

    this.getWeather();

    this.subscription = this.citySelectService.notification.subscribe((res) => {
      if (res.hasOwnProperty('city')) {
        this.getLatLon(res.city);
      }
    });
  }

  getWeatherArray(): void {
    this.weatherService.getWeatherReports(this.user.weatherSettings)
      .then(weather => {
        this.weatherArray = weather;
      })
      .catch(res => {
        console.log(res);
        this.weatherArrayError = 'There was an error retrieving weather data.';
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

  getLatLon(city): void {
    this.weatherService.getLatLon(city)
      .then(latLon => {
        this.user.weatherSettings.lon = latLon.lon;
        this.user.weatherSettings.lat = latLon.lat;
        this.getWeather();
        this.getWeatherArray();
      })
      .catch(res => {
        let latLonError = 'There was an error changing cities.';

        this.weatherError = latLonError;
        this.weatherArrayError = latLonError;
      });
  }

}
