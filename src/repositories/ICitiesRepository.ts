import { City } from "../model/City";

interface ISummarizedCity {
  name: string,
  id: string,
  icon: string,
  temp: number
}

interface ICreateCityDTO {
  name: string;
  weather: {
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      humidity: number;
    },
    weather: {
      main: string;
      description: string;
      icon: string;
    }
  }
}

interface ICitiesRepository {
  findByName(name: string): City;
  findById(id: string): City;
  list(): ISummarizedCity[];
  create({ name, weather }: ICreateCityDTO): void;
}

export { ICitiesRepository, ICreateCityDTO, ISummarizedCity };
