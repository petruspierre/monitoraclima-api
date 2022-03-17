import { Request, Response } from "express";
import { OpenWeatherService } from "../services/openWeather";
import { ICitiesRepository } from "../repositories/ICitiesRepository";

interface IWeatherResponse {
  data: {
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

class CitiesController {
  private categoriesRepository: ICitiesRepository;
  private openWeatherService: OpenWeatherService;

  constructor(categoriesRepository: ICitiesRepository, openWeatherService: OpenWeatherService) {
    this.categoriesRepository = categoriesRepository;
    this.openWeatherService = openWeatherService
  }

  async create(req: Request, res: Response) {
    const { name } = req.body;

    const cityAlreadyExists = this.categoriesRepository.findByName(name);

    if (cityAlreadyExists) {
      return res.status(400).json({ error: 'City already exists' })
    }

    try {
      const { data: weather } = await this.openWeatherService.getCityWeather(name) as IWeatherResponse

      const city = this.categoriesRepository.create({ name, weather })

      return res.status(201).json(city)
    } catch(err) {
      return res.status(400).json({ error: 'Couldn\'t find a city called ' + name })
    }
  }

  list(req: Request, res: Response) {
    const cities = this.categoriesRepository.list();

    return res.status(200).json(cities)
  }

  show(req: Request, res: Response) {
    const { id } = req.params;

    const city = this.categoriesRepository.findById(id);

    return res.status(200).json(city)
  }
}

export { CitiesController }
