import { Injectable } 							   from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } 							   from 'rxjs/Rx';

import 'rxjs/add/operator/toPromise';

import { Weather } from './weather';

@Injectable() 
export class WeatherService {
	private weatherUrl = '/api/weather';

	constructor(private http: Http) {};

	getWeatherReport(): Promise<Weather> {
		return this.http.get(this.weatherUrl)
				   .toPromise()
				   .then(response => this.logWeather(response.json().data) as Weather)
				   .catch(this.handleError);
	}

	logWeather(res): Weather {
		console.log(res);

		return res;
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occured', error);
		return Promise.reject(error.message || error);
	}
}