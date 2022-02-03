import Axios from "../axios";

const KEY = process.env.REACT_APP_SECRET_KEY;

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
