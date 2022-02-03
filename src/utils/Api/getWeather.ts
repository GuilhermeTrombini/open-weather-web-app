import { round } from "../round";
import { Api } from "./Api";

export const _getWeather = async (lat: number, lon: number) => {
  const weather = await Api.getCurrentWeather(lat, lon);

  if (!weather) return;

  return {
    cityName: weather.name,
    main: weather.weather[0].main,
    temperature: {
      current: round(weather.main.temp - 273.15, 1),
      min: round(weather.main.temp_min - 273.15, 1),
      max: round(weather.main.temp_max - 273.15, 1),
    },
    wind: weather.wind.speed,
    humidity: weather.main.humidity,
  };
};
