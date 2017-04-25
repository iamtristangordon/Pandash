import { Component, OnInit }   from '@angular/core';
 
import { City }                from './city';
import { CitiesSearchService } from './cities-search.service';
import { Weather }             from './weather';
import { WeatherService }      from './weather.service';
import { CitySelectService }   from './city-select.service';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';


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
