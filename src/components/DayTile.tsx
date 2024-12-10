import { useState, useEffect } from "react";
import "./ForecastTile.css";
import WeatherCard from "./WeatherCard";
import { WeatherType } from "./WeatherIcon";

export interface IDayWeatherCard
{
    key: string;
    title: string;
    tempMain: number;
    weather: WeatherType;
    isNight: boolean;
}

export const defaultCard: IDayWeatherCard = 
{
    key: "day-tile-0 ",
    title: "06:00",
	tempMain: 0,
	weather: WeatherType.Clear,
	isNight: false
}

interface IDayTile
{
    weatherCards: IDayWeatherCard[]
}

export default function DayTile(props: IDayTile)
{
    const [weatherCards, setWeatherCards] = useState([defaultCard]);
    const [key, setKey] = useState(defaultCard.key);
    useEffect(() => {
        // Update every 0.1 seconds
        const interval = setInterval(() => {
            setWeatherCards(props.weatherCards);
            setKey(props.weatherCards[0].key);
        }, 100);
        return () => 
        {
            clearInterval(interval);
        }
    }, [props])

    return (
        <div className="forecast-tile" key={key}>
            <div className="weather-card-tile">
            {
                weatherCards.map((value) => 
                    <WeatherCard key={value.key} title={value.title} weather={value.weather} isNight={value.isNight} tempMain={value.tempMain}/>)
            }
            </div>
            <div className="matte-tile"></div>
        </div>
    );
}