import { useEffect, useState } from "react";
import { _getWeather } from "../../utils/Api/getWeather";
import IconSelect from "../IconSelect/iconSelect";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
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
  const [isLoading, setIsLoading] = useState(true);
  const [latLng, setLatLng] = useState({
    // default to Brasília
    lat: -15.474279,
    lng: -48.84098,
  });

  const updateWeather = async (lat: number, lng: number) => {
    setIsLoading(true);
    const data: any = await _getWeather(lat, lng);
    setWeather(data);
    if (data) {
      setIsLoading(false);
    }
  };

  const success = (pos: any) => {
    var crd = pos.coords;
    setLatLng({
      lat: crd.latitude,
      lng: crd.longitude,
    });
    updateWeather(crd.latitude, crd.longitude);
  };

  const error = (err: any) => {
    updateWeather(latLng.lat, latLng.lng);

    console.warn("ERROR(" + err.code + "): " + err.message);
  };

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
          {isLoading ? (
            <Icon>
              <Skeleton
                baseColor="#1c86be"
                highlightColor="#09a9ff"
                borderRadius="0.7rem"
                height="100%"
                duration={4}
              />
            </Icon>
          ) : (
            <Icon>
              <IconSelect iconType={weather.main} />
            </Icon>
          )}
          <div>
            {isLoading ? (
              <Temperature>
                <Skeleton
                  baseColor="#1c86be"
                  highlightColor="#09a9ff"
                  borderRadius="0.7rem"
                  height="100%"
                  duration={4}
                />
              </Temperature>
            ) : (
              <Temperature>{weather.temperature.current} °C</Temperature>
            )}
            {isLoading ? (
              <Location>
                <Skeleton
                  baseColor="#1c86be"
                  highlightColor="#09a9ff"
                  borderRadius="0.7rem"
                  height="100%"
                  duration={4}
                />{" "}
              </Location>
            ) : (
              <Location>{weather.cityName}</Location>
            )}
          </div>
        </ContentContainer>
        <ContentContainer>
          <div>
            {isLoading ? (
              <Location>
                <Skeleton
                  baseColor="#1c86be"
                  highlightColor="#09a9ff"
                  borderRadius="0.7rem"
                  height="100%"
                  duration={4}
                  style={{ marginBottom: "5px", marginTop: "10px" }}
                />{" "}
                <Skeleton
                  baseColor="#1c86be"
                  highlightColor="#09a9ff"
                  borderRadius="0.7rem"
                  height="100%"
                  width="40%"
                  duration={4}
                />{" "}
              </Location>
            ) : (
              <>
                <Location>Vento</Location>
                <Description>{weather.wind} m/s</Description>
              </>
            )}
          </div>
          <div>
            {isLoading ? (
              <Location>
                <Skeleton
                  baseColor="#1c86be"
                  highlightColor="#09a9ff"
                  borderRadius="0.7rem"
                  height="110%"
                  duration={4}
                  style={{ marginBottom: "5px", marginTop: "10px" }}
                />{" "}
                <Skeleton
                  baseColor="#1c86be"
                  highlightColor="#09a9ff"
                  borderRadius="0.7rem"
                  height="110%"
                  width="40%"
                  duration={4}
                />{" "}
              </Location>
            ) : (
              <>
                <Location>Umidade</Location>
                <Description>{weather.humidity} %</Description>
              </>
            )}
          </div>
        </ContentContainer>
        <RefreshButton onClick={() => updateWeather(latLng.lat, latLng.lng)}>
          Recaregar
        </RefreshButton>
      </WeatherContainer>
    </Container>
  ) : (
    <Container>
      <WeatherContainer>
        <ContentContainer>
          <Location>Falha ao carregar conteúdo</Location>
          <RefreshButton onClick={() => updateWeather(latLng.lat, latLng.lng)}>
            Recarregar
          </RefreshButton>
        </ContentContainer>
      </WeatherContainer>
    </Container>
  );
}
