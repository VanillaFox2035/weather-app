import "./CurrentTile.css";
import { useEffect, useState } from "react";
import WeatherIcon, { WeatherType } from "./WeatherIcon";
import { DAYS, MONTHS } from "../Define";

interface ICurrentTile
{
    location: string;
    locationSub?: string;
    weather: WeatherType;
    isNight: boolean;
    temperature: number;
    precipitation: number;
    humidity: number;
}

export default function CurrentTile(props: ICurrentTile)
{
    // Prop update
    const [location, setLocation] = useState("N/A");
    const [locationSub, setLocationSub] = useState("N/A");
    const [weather, setWeather] = useState(WeatherType.Clear);
    const [isNight, setIsNight] = useState(false);
    const [temperature, setTemperature] = useState("N/A");
    const [precipitation, setPrecipitation] = useState("N/A");
    const [humidity, setHumidity] = useState("N/A");

    // Time update
    const [time, setTime] = useState("N/A");
    const [timeSecond, setTimeSecond] = useState("N/A");
    const [date, setDate] = useState("N/A");

    useEffect(() => {
        // Update on prop change
        setLocation(props.location);
        if (props.locationSub)
        {
            setLocationSub(props.locationSub);
        }
        else
        {
            setLocationSub("");
        }
        setWeather(props.weather);
        setIsNight(props.isNight);
        setTemperature(props.temperature.toString());
        setPrecipitation(props.precipitation.toString());
        setHumidity(props.humidity.toString());

        // Update every 0.1 seconds
        const interval = setInterval(() => {
            setTime(GetFormattedTime());
            setTimeSecond(GetFormattedTimeSecond());
            setDate(GetFormattedDate());
        }, 100);

        // Clear clock after component destroyed
        return () => {
            clearInterval(interval);
        }
    }, [props]);

    function GetFormattedTime(): string
    {
        const hour = PadNumber(new Date().getHours(), 2);
        const minute = PadNumber(new Date().getMinutes(), 2);
        const result = hour + ":" + minute;
        return result;
    }

    function GetFormattedTimeSecond(): string
    {
        const second: string = PadNumber(new Date().getSeconds(), 2);
        const result = ":" + second;
        return result;
    }

    function GetFormattedDate(): string
    {
        const day = DAYS[new Date().getDay()];
        const date = new Date().getDate();
        const month = MONTHS[new Date().getMonth()];
        const result = day + ", " + month + " " + date;
        return result;
    }

    function PadNumber(input: number, length: number): string
    {
        let result = input.toString();
        while (result.length < length)
        {
            result = "0" + result;
        }
        return result;
    }

    return (
        <div className="current-tile">
            <div className="left-block">
                <div className="flex-block">
                    <img width="18px" src="/location.svg"/>
                    <h2 className="location-text">{location}</h2>
                    <h2 className="location-text-sub">{locationSub}</h2>
                </div>

                <div className="flex-block">
                    <h1 className="current-time">{time}</h1>
                    <h2 className="current-time-second">{timeSecond}</h2>
                </div>

                <h4 className="current-date">{date}</h4>
                
            </div>
            <div className="right-block">
                <WeatherIcon weather={weather} isNight={isNight} width="150px"/> 
                <h1 className="current-temperature">{temperature}°</h1>
                <h4 className="weather-detail">Precipitation: {precipitation}%</h4>
                <h4 className="weather-detail">Humidity: {humidity}%</h4>
            </div>
        </div>
    );
}