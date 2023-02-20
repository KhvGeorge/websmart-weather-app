import { Component } from '@angular/core';
import {
  Observable,
  catchError,
  combineLatest,
  debounceTime,
  delay,
  distinctUntilChanged,
  finalize,
  map,
  of,
  switchMap,
} from 'rxjs';
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
    this.weather$ = of(city).pipe(
      delay(500), // wait for 500ms after each keystroke
      distinctUntilChanged(), // only emit when the query has changed
      switchMap((query: string) => {
        return this.weatherService.getWeather(query).pipe(
          catchError(() => of(null)),
          finalize(() => (this.isLoading = false))
        );
      })
    );
  }
}
