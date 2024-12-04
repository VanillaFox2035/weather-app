import { useState, useEffect } from "react";
import "./ForecastTile.css";
import WeatherCard from "./WeatherCard";
import { WeatherType } from "./WeatherIcon";

export interface IWeekWeatherCard
{
    title: string;
    tempMain: number;
    tempSub: number;
    weather: WeatherType;
}

export const defaultCard: IWeekWeatherCard = 
{
    title: "Sun",
	tempMain: 0,
	tempSub: 0,
	weather: WeatherType.Clear
}

interface IWeekTile
{
    weatherCards: IWeekWeatherCard[]
}

export default function WeekTile(props: IWeekTile)
{
    const [weatherCards, setWeatherCards] = useState([defaultCard]);
    useEffect(() => {
        setWeatherCards(props.weatherCards);
    }, [props])

    return (
        <div className="forecast-tile">
            {
                weatherCards.map((value, index) => 
                <WeatherCard key={"week-tile-" + index.toString()} title={value.title} weather={value.weather} tempMain={value.tempMain} tempSub={value.tempSub}/>)
            }
        </div>
    );
}