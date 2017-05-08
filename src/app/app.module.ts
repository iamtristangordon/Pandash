import { BrowserModule }    from '@angular/platform-browser';
import { NgModule }         from '@angular/core';
import { FormsModule }      from '@angular/forms';
import { HttpModule }       from '@angular/http';
import { MaterialModule }   from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WeatherComponent } from './weather/weather.component';
import { CitiesSearchComponent } from './cities-search/cities-search.component';

import { WeatherService} from './_services/weather.service';
import { CitySelectService } from './_services/city-select.service';
import { AlertService } from './_services/alert.service';

import { AppRoutingModule } from './app-routing.module';

import 'hammerjs';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    WeatherComponent,
    CitiesSearchComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule
  ],
  providers: [
    WeatherService,
    CitySelectService,
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

