import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, combineLatest, finalize, map, of } from 'rxjs';
import { WeatherService } from '../weather.service';
import { WeatherData } from './weather-data.interface';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss'],
})
export class WeatherForecastComponent {
  weather$!: Observable<WeatherData>;
  isLoading = false;
  currentDate = new Date();

  constructor(private weatherService: WeatherService) {}

  getWeather(city: string): void {
    if (!city) {
      return;
    }

    this.isLoading = true;
    this.weather$ = this.weatherService.getWeather(city).pipe(
      catchError(() => of(null)),
      finalize(() => (this.isLoading = false))
    );
  }
}
