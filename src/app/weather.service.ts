import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private readonly apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private readonly apiKey = environment.apiKey;

  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<any> {
    const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        const weather = response.weather[0];
        return {
          cityName: response.name,
          description: weather.description,
          iconCode: weather.icon,
          temperature: response.main.temp,
          country: response.sys.country,
        };
      })
    );
  }
}
