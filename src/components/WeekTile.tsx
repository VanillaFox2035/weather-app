import { useState, useEffect } from "react";
//import "./ForecastTile.css";
import WeatherCard from "./WeatherCard";
import { WeatherType } from "./WeatherIcon";

export interface IWeekWeatherCard
{
    key: string;
    title: string;
    tempMain: number;
    tempSub: number;
    weather: WeatherType;
    weatherString: string;
}

export const defaultCard: IWeekWeatherCard = 
{
    key: "week-tile-0 ",
    title: "Sun",
	tempMain: 0,
	tempSub: 0,
	weather: WeatherType.Clear,
    weatherString: "晴",
}

interface IWeekTile
{
    weatherCards: IWeekWeatherCard[];
    width: number;
}

export default function WeekTile(props: IWeekTile)
{
    const [weatherCards, setWeatherCards] = useState([defaultCard]);
    const [key, setKey] = useState(defaultCard.key);
    useEffect(() => {
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
        <>
        
        <div className="forecast-tile" key={key}>
            <div className="weather-card-tile">
            {
                weatherCards.map((value, index) => 
                    (index < 3 || index <= (props.width - 200)/ 95) && <WeatherCard key={value.key} title={value.title} weather={value.weather} weatherString={value.weatherString} tempMain={value.tempMain} tempSub={value.tempSub}/>)
            }
            </div>
            <div className="matte-tile"></div>
        </div>
        </>
        
    );
}