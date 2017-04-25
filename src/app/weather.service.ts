import { Injectable } 							   from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Weather } from './weather';

@Injectable() 
export class WeatherService {
	
	private weatherUrl = '/api/weather';

	constructor(private http: Http) {};

	getWeatherReport(settings): Promise<Weather> {
		const url = `${this.weatherUrl}?lat=${settings.lat}&lon=${settings.lon}&units=${settings.units}`;
		return this.http.get(url)
				   .toPromise()
				   .then(response => response.json().weatherReport as Weather)
				   .catch(this.handleError);
	}

	getWeatherReports(settings): Promise<Weather[]> {
		const url = `${this.weatherUrl}?lat=${settings.lat}&lon=${settings.lon}&units=${settings.units}&count=9&multi=true`;
		return this.http.get(url)
				   .toPromise()
				   .then(response => response.json().weatherReports as Weather[])
				   .catch(this.handleError);
	}

	getLatLon(city): Promise<any> {
		const url = `/api/coordinates?city=${city}`;
		return this.http.get(url)
				   .toPromise()
				   .then(response => response.json().coordinates)
				   .catch(this.handleError);
	}

	//used to debug/troubleshoot
	logWeather(res): Weather[] {
		console.log(res);

		return res;
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occured', error);
		return Promise.reject(error.message || error);
	}
}