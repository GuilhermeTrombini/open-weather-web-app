import { useEffect, useState } from "react";
import { _getWeather } from "../../utils/Api/getWeather";
import IconSelect from "../IconSelect/iconSelect";
import {
  Container,
  Icon,
  WeatherContainer,
  Temperature,
  Location,
  ContentContainer,
  RefreshButton,
  Description,
} from "./styles";

interface WeatherProps {
  cityName: string;
  main: string;
  temperature: {
    current: number;
    min: number;
    max: number;
  };
  wind: number;
  humidity: number;
}
export default function WeatherCard() {
  const [weather, setWeather] = useState<WeatherProps>({
    cityName: "Brasília",
    main: "",
    temperature: {
      current: 0,
      min: 0,
      max: 0,
    },
    wind: 0,
    humidity: 0,
  });
  const [latLng, setLatLng] = useState({
    // default to Brasília
    lat: -15.474279,
    lng: -48.84098,
  });

  const updateWeather = async (lat: number, lng: number) => {
    const data: any = await _getWeather(lat, lng);
    setWeather(data);
  };

  function success(pos: any) {
    var crd = pos.coords;
    setLatLng({
      lat: crd.latitude,
      lng: crd.longitude,
    });
    updateWeather(crd.latitude, crd.longitude);
  }

  function error(err: any) {
    updateWeather(latLng.lat, latLng.lng);

    console.warn("ERROR(" + err.code + "): " + err.message);
  }

  useEffect(() => {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  return weather ? (
    <Container>
      <WeatherContainer>
        <ContentContainer>
          <Icon>
            <IconSelect iconType={weather.main} />
          </Icon>
          <div>
            <Temperature>{weather.temperature.current} °C</Temperature>
            <Location>{weather.cityName}</Location>
          </div>
        </ContentContainer>
        <ContentContainer>
          <div>
            <Location>Vento</Location>
            <Description>{weather.wind} m/s</Description>
          </div>
          <div>
            <Location>Umidade</Location>
            <Description>{weather.humidity} %</Description>
          </div>
        </ContentContainer>
        <ContentContainer>
          <RefreshButton onClick={() => updateWeather(latLng.lat, latLng.lng)}>
            Recaregar
          </RefreshButton>
        </ContentContainer>
      </WeatherContainer>
    </Container>
  ) : (
    <Container>
      <WeatherContainer>
        <ContentContainer>
          <Location>Falha ao carregar conteúdo</Location>
          <RefreshButton onClick={() => updateWeather(latLng.lat, latLng.lng)}>
            Recaregar
          </RefreshButton>
        </ContentContainer>
      </WeatherContainer>
    </Container>
  );
}
