import React from "react";
import ReactAnimatedWeather from "react-animated-weather";

const defaults = {
  color: "white",
  size: 150,
  animate: true,
};

export default function IconSelect(props: any) {
  const hr = new Date().getHours();
  const validateHour = (dayType: string, nightType: string) => {
    if (hr >= 18 || hr <= 6) {
      return nightType;
    } else {
      return dayType;
    }
  };
  const selectIcon = () => {
    switch (props.iconType) {
      case "Clear":
        return validateHour("CLEAR_DAY", "CLEAR_NIGHT");
      case "Clouds":
        return validateHour("PARTLY_CLOUDY_DAY", "PARTLY_CLOUDY_NIGHT");
      case "Rain":
        return "RAIN";
      case "Thunderstorm":
        return "SLEET";
      case "Snow":
        return "SNOW";
      case "Mist" ||
        "Somke" ||
        "Haze" ||
        "Dust" ||
        "Ash" ||
        "Fog" ||
        "Squall" ||
        "Tornado" ||
        "Sand":
        return "FOG";
      default:
        return "CLOUDY";
    }
  };

  return (
    <ReactAnimatedWeather
      icon={selectIcon()}
      color={defaults.color}
      size={defaults.size}
      animate={defaults.animate}
    />
  );
}
