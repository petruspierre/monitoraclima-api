import { City } from "../model/City";
import { ICitiesRepository, ICreateCityDTO, ISummarizedCity } from "./ICitiesRepository";

class CitiesRepository implements ICitiesRepository {
  private cities: City[]

  private static INSTANCE: CitiesRepository

  private constructor() {
    this.cities = []
  }

  static getInstance(): CitiesRepository {
    if(!CitiesRepository.INSTANCE) {
      CitiesRepository.INSTANCE = new CitiesRepository()
    }

    return CitiesRepository.INSTANCE
  }

  findByName(name: string): City {
    const city = this.cities.find((cityQuery) => cityQuery.name === name)

    return city
  }

  findById(id: string): City {
    const city = this.cities.find((cityQuery) => cityQuery.id === id)

    return city
  }

  list(): ISummarizedCity[] {
    const cities = this.cities.map(city => ({
      name: city.name,
      id: city.id,
      icon: city.weather.icon,
      temp: city.weather.temperature.main
    }))

    return cities
  }

  create({ name, weather }: ICreateCityDTO): ISummarizedCity {
    const city: City = new City();

    Object.assign(city, {
      name,
      weather: {
        temperature: {
          main: weather.main.temp,
          feels_like: weather.main.feels_like,
          min: weather.main.temp_min,
          max: weather.main.temp_max
        },
        status: weather.weather[0].main,
        description: weather.weather[0].description,
        icon: `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`
      }
    });

    this.cities.push(city);

    return {
      name: city.name,
      id: city.id,
      icon: city.weather.icon,
      temp: city.weather.temperature.main
    };
  }
}

export { CitiesRepository }
