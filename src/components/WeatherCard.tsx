import "./WeatherCard.css";
import "./WeatherIcon";
import WeatherIcon, {WeatherType} from "./WeatherIcon";

export interface IWeatherCard
{
    key: string;
    time: string;
    weather?: WeatherType;
    tempMain: number;
    tempSub?: number;
}

export default function WeatherCard(props: IWeatherCard)
{
    return (
    <div className="weather-card" key={props.key}>
        <h4 className="forecast-time">{props.time}</h4>
        <div className="spacing"></div>
        <WeatherIcon/>
        <div className="spacing"></div>
        {
            props.tempSub? 
            <div className="flex-block">
                <h3 className="forecast-temperature-high">{props.tempMain.toString()}°</h3>
                <h3 className="forecast-temperature-divider">/</h3>
                <h3 className="forecast-temperature-low">{props.tempSub.toString()}°</h3>
            </div>
            :
            <h3 className="forecast-temperature">{props.tempMain}°</h3>
        }
    </div>
    );
}