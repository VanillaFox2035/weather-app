import { useState, useEffect } from "react";
//import "./ForecastTile.css";
import WeatherCard from "./WeatherCard";
import WeatherList from "./WeatherList";
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

export const defaultCards: IWeekWeatherCard[] = 
    Array.from({length: 6}, (_, index) => index)
        .map(index => {
            return {
                key: "week-tile-" + index.toString(),
                title: "-",
	            tempMain: -99,
	            tempSub: -99,
	            weather: WeatherType.Unknown,
                weatherString: "?",
        };
});

interface IWeekTile
{
    weatherCards: IWeekWeatherCard[];
    width: number;
}

export default function WeekTile(props: IWeekTile)
{
    const [weatherCards, setWeatherCards] = useState(defaultCards);
    const [key, setKey] = useState(defaultCards[0].key);
    const isMobile = props.width <= 800;
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
        <div className="forecast-tile" key={key}>
            <div className={isMobile ? "weather-list-tile" : "weather-card-tile"}>
            {
                isMobile?
                weatherCards.map((value, index, array) => 
                    <>
                        <WeatherList key={value.key} title={value.title} weather={value.weather} weatherString={value.weatherString} tempMain={value.tempMain} tempSub={value.tempSub}/>
                        {(index < array.length - 1) && <hr className="weather-list-divider"/>}
                    </>
                )
                :
                weatherCards.map((value, index) => 
                    (index < 3 || index <= (props.width - 200)/ 95) && <WeatherCard key={value.key} title={value.title} weather={value.weather} weatherString={value.weatherString} tempMain={value.tempMain} tempSub={value.tempSub}/>)
            }
            </div>
            <div className="matte-tile"></div>
        </div>
    );
}