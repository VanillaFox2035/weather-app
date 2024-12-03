import "./WeatherIcon.css";

export enum WeatherType
{
    
}

interface IWeatherIcon
{
    width?: string;
    weather?: WeatherType;
    isDay?: boolean;
}

export default function WeatherIcon(props: IWeatherIcon)
{
    return (
        <img className="weather-icon" width={props.width? props.width : "50px"} src="/WeatherIcons/Google/Day/clear_day.svg"/>
    );
}