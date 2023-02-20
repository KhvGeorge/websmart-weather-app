import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css'],
})
export class WeatherForecastComponent {
  city!: string;
  weather: any;
  loading = false;

  constructor(private http: HttpClient) {}

  onCityInput() {
    if (this.city && this.city.length >= 3) {
      const apiKey = '631b7b20392d15888cd2379e8e92fe3a';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=${apiKey}`;
      this.loading = true;
      this.http.get(url).subscribe((data: any) => {
        this.weather = data;
        this.loading = false;
      });
    } else {
      this.weather = null;
    }
  }

  getWeatherIconUrl(icon: string) {
    return `https://openweathermap.org/img/w/${icon}.png`;
  }
}
