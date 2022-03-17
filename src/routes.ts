import { CitiesController } from "./controller/CitiesController";
import { Router } from "express";
import { CitiesRepository } from "./repositories/CitiesRepository";
import { OpenWeatherService } from "./services/openWeather";

const router = Router();

const citiesRepository = CitiesRepository.getInstance();

const openWeatherService = new OpenWeatherService(process.env.OPEN_WEATHER_API_KEY);

const citiesController = new CitiesController(citiesRepository, openWeatherService)

const delayMiddleware = (req, res, next) => {
  setTimeout(() => {
    next();
  }, 2000)
}

const delayMiddlewareError = (req, res, next) => {
  setTimeout(() => {
    res.status(400).send()
  }, 2000)
}

router.post('/cities', delayMiddleware, (req, res) => {
  return citiesController.create(req, res)
});

router.get('/cities', delayMiddleware, (req, res) => {
  return citiesController.list(req, res)
});

router.get('/cities/:id', delayMiddleware, (req, res) => {
  return citiesController.show(req, res)
});

export { router }