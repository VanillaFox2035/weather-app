import "./WeatherCard.css";
import "./WeatherIcon";
import { useEffect, useState } from "react";
import WeatherIcon, {WeatherType} from "./WeatherIcon";

export interface IWeatherCard
{
    key: string;
    time: string;
    isNight?: boolean;
    weather: WeatherType;
    tempMain: number;
    tempSub?: number;
}

export default function WeatherCard(props: IWeatherCard)
{
    // Update render on props value changed
    const [time, setTime] = useState("N/A");
    const [weather, setWeather] = useState(WeatherType.Clear);
    const [isNight, setIsNight] = useState(false);
    const [tempMain, setTempMain] = useState("N/A");
    const [tempSub, setTempSub] = useState("N/A");
    useEffect(() => {
        // Set time
        setTime(props.time);
        // Set weather icon
        setWeather(props.weather);
        if (props.isNight)
        {
            setIsNight(true);
        }
        else
        {
            setIsNight(false);
        }
        // Set temperature
        setTempMain(props.tempMain.toString());
        if (props.tempSub)
        {
            setTempSub(props.tempSub.toString());
        }
    }, [props]);

    return (
    <div className="weather-card">
        <h4 className="forecast-time">{time}</h4>
        <div className="spacing"></div>
        <WeatherIcon weather={weather} isNight={isNight}/>
        <div className="spacing"></div>
        {
            props.tempSub? 
            <div className="flex-block">
                <h3 className="forecast-temperature-high">{tempMain}°</h3>
                <h3 className="forecast-temperature-divider">/</h3>
                <h3 className="forecast-temperature-low">{tempSub}°</h3>
            </div>
            :
            <h3 className="forecast-temperature">{tempMain}°</h3>
        }
    </div>
    );
}