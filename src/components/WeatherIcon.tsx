import "./WeatherIcon.css";

interface IWeatherIcon
{
    width?: string;
}

export default function WeatherIcon(props: IWeatherIcon)
{
    return (
        <img className="weather-icon" width={props.width? props.width : "50px"} src="/WeatherIcons/Google/Day/clear_day.svg"/>
    );
}