import "./WeatherCard.css";
import "./WeatherIcon";
import WeatherIcon from "./WeatherIcon";

interface IWeatherCard
{
    
}

export default function WeatherCard(props: IWeatherCard)
{
    return (
    <div className="weather-card">
        <h4 className="forecast-time">SUN</h4>
        <div className="spacing"></div>
        <WeatherIcon/>
        <div className="spacing"></div>
        <div className="flex-block">
            <h3 className="forecast-temperature-high">26°</h3>
            <h3 className="forecast-temperature-divider"> | </h3>
            <h3 className="forecast-temperature-low">15°</h3>
        </div>
    </div>
    );
}