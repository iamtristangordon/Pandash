import { Injectable }                              from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { City } from '../_models/city';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class CitiesSearchService {
    constructor(private http: Http) {}

    private citiesUrl = '/api/cities';
    
    searchCities(input: string): Observable<City[]> {
        const url = `${this.citiesUrl}?input=${input}`;
        return this.http.get(url)
                   .map(response => response.json().citiesResults as City[]);
    }

    logWeather(res): City[] {
      console.log(res);

      return res;
    }

}
