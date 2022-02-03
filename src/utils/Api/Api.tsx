import Axios from "../axios";

const KEY = "8d85f498b43e7ce143339c7823946256";

const getCurrentWeather = (lat: number, lon: number) =>
  Axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
    params: {
      lat,
      lon,
      appid: KEY,
    },
  }).then((res) => res.data);

export const Api = {
  getCurrentWeather,
};
