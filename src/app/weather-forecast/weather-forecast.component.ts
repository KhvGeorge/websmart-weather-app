import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest, map, of } from 'rxjs';
import { WeatherService } from '../weather.service';
import { WeatherData } from './weather-data.interface';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css'],
})
export class WeatherForecastComponent {
  weather$!: Observable<any>;
  isLoading = false;
  currentDate = new Date();

  constructor(private weatherService: WeatherService) {}

  getWeather(city: string): void {
    this.isLoading = true;
    this.weather$ = this.weatherService.getWeather(city);
    this.weather$.subscribe(() => (this.isLoading = false));
  }
}
