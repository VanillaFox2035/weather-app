import { useState, useEffect } from "react";
import "./ForecastTile.css";
import WeatherCard from "./WeatherCard";
import { WeatherType } from "./WeatherIcon";

interface IDayWeatherCard
{
    title: string;
    tempMain: number;
    weather: WeatherType;
    isNight: boolean;
}

const defaultCard: IDayWeatherCard = 
{
    "title": "06:00",
	"tempMain": 20,
	"weather": WeatherType.Clear,
	"isNight": false
}

interface IDayTile
{
    weatherCards: IDayWeatherCard[]
}

export default function DayTile(props: IDayTile)
{
    const [weatherCards, setWeatherCards] = useState([defaultCard]);
    useEffect(() => {
        setWeatherCards(props.weatherCards);
    }, [props])

    return (
        <div className="forecast-tile">
            {
                weatherCards.map((value, index) => 
                    <WeatherCard key={"day-tile-" + index.toString()} title={value.title} weather={value.weather} isNight={value.isNight} tempMain={value.tempMain}/>)
            }
        </div>
    );
}