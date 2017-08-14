import { Component, OnInit }   from '@angular/core';
 
import { City }                from '../_models/city';
import { CitiesSearchService } from '../_services/cities-search.service';
import { Weather }             from '../_models/weather';
import { WeatherService }      from '../_services/weather.service';
import { CitySelectService }   from '../_services/city-select.service';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-cities-search',
  templateUrl: './cities-search.component.html',
  styleUrls: ['./cities-search.component.css'],
  providers: [CitiesSearchService]
})
export class CitiesSearchComponent implements OnInit {
    cities: Observable<City[]>;

    cityName: string = '';

    showCities: boolean = false;

    private searchInput = new Subject<string>();

    search(input: string): void {
        this.showCities = true;

        //push each new term into the observable stream
        this.searchInput.next(input);
    }

    constructor(
        private citiesSearchService: CitiesSearchService,
        private weatherService: WeatherService,
        private citySelectService: CitySelectService) {}

    selectCity(city): void {
        this.citySelectService.sendNotification({city: city});
    }

    ngOnInit() {
        this.cities = this.searchInput
            .debounceTime(200)
            .distinctUntilChanged()//ignore input unless it changes
            .switchMap(input => input 
                ? this.citiesSearchService.searchCities(input) 
                : Observable.of<City[]>([]))
            .catch(error => {
                console.log(error);
                return Observable.of<City[]>([]);
            });
    }

  }
