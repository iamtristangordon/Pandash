import { BrowserModule }  from '@angular/platform-browser';
import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { HttpModule }     from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { WeatherService} from './weather.service';
import { DashboardComponent } from './dashboard.component';
import { WeatherComponent } from './weather.component';

import { AppRoutingModule } from './app-routing.module';

import 'hammerjs';
import { CitiesSearchComponent } from './cities-search.component';

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
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }

