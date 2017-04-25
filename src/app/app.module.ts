import { BrowserModule }  from '@angular/platform-browser';
import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { HttpModule }     from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard.component';
import { WeatherComponent } from './weather.component';
import { CitiesSearchComponent } from './cities-search.component';

import { WeatherService} from './weather.service';
import { CitySelectService } from './city-select.service';

import { AppRoutingModule } from './app-routing.module';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    WeatherComponent,
    CitiesSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [
    WeatherService,
    CitySelectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

