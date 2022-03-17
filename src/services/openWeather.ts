import axios, { AxiosInstance } from 'axios';

class OpenWeatherService {
  private apiKey: string;
  private api: AxiosInstance;

  constructor(apiKey: string) {
    this.apiKey = apiKey;

    this.api = axios.create({
      baseURL: 'https://api.openweathermap.org/data/2.5/weather'
    })
  }

  getCityWeather(name: string) {
    return new Promise((resolve, reject) => {
      const params = new URLSearchParams();

      params.append('q', name);
      params.append('units', 'metric');
      params.append('lang', 'pt_br');
      params.append('appid', this.apiKey);

      this.api.get(`?${params.toString()}`)
        .then(resolve)
        .catch(reject)
    })
  }
}

export { OpenWeatherService }
