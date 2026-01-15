import { useState, useEffect } from "react";
import "./ForecastTile.css";
import WeatherCard from "./WeatherCard";
import WeatherList from "./WeatherList";
import { WeatherType } from "./WeatherIcon";

export interface IDayWeatherCard
{
    key: string;
    title: string;
    tempMain: number;
    weather: WeatherType;
    weatherString: string;
    isNight: boolean;
}

export const defaultCards: IDayWeatherCard[] = 
Array.from({length: 6}, (_, index) => index)
    .map(index => {
        return {
            key: "day-tile-" + index.toString(),
            title: "-",
	        tempMain: -99,
	        weather: WeatherType.Unknown,
            weatherString: "?",
	        isNight: false
        };
});

interface IDayTile
{
    weatherCards: IDayWeatherCard[];
    width: number;
}

export default function DayTile(props: IDayTile)
{
    const [weatherCards, setWeatherCards] = useState(defaultCards);
    const [key, setKey] = useState(defaultCards[0].key);
    const isMobile = props.width <= 800;
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
            <div className={isMobile ? "weather-list-tile" : "weather-card-tile"}>
            {
                isMobile?
                weatherCards.map((value, index, array) => 
                    <>
                        <WeatherList key={value.key} title={value.title} weather={value.weather} weatherString={value.weatherString} isNight={value.isNight} tempMain={value.tempMain}/>
                        {(index < array.length - 1) && <hr className="weather-list-divider"/>}
                    </>
                    )
                :
                weatherCards.map((value, index) => 
                    (index < 3 || index <= (props.width - 200)/ 95) && <WeatherCard key={value.key} title={value.title} weather={value.weather} weatherString={value.weatherString} isNight={value.isNight} tempMain={value.tempMain}/>)
            }
            </div>
            <div className="matte-tile"></div>
        </div>
    );
}