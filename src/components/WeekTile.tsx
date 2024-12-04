import "./ForecastTile.css";
import WeatherCard, { IWeatherCard } from "./WeatherCard";
import { WeatherType } from "./WeatherIcon";

interface IWeekTile
{
    weatherCardsDay?: IWeatherCard[]
}

export default function WeekTile(props: IWeekTile)
{
    const weatherCardsWeek = [
        {
            "time": "Sun",
            "tempMain": 20,
            "tempSub": 16,
            "weather": WeatherType.Clear
        },
        {
            "time": "Mon",
            "tempMain": 22,
            "tempSub": 15,
            "weather": WeatherType.Thunderstorms
        },
        {
            "time": "Tue",
            "tempMain": 20,
            "tempSub": 15,
            "weather": WeatherType.VeryHot
        },
        {
            "time": "Wed",
            "tempMain": 22,
            "tempSub": 15,
            "weather": WeatherType.VeryCold
        },
        {
            "time": "Thu",
            "tempMain": 20,
            "tempSub": 15,
            "weather": WeatherType.Cloudy
        },
        {
            "time": "Fri",
            "tempMain": 22,
            "tempSub": 14,
            "weather": WeatherType.Icy
        },
        {
            "time": "Sat",
            "tempMain": 20,
            "tempSub": 15,
            "weather": WeatherType.BlowingSnow
        }
    ];

    return (
        <div className="forecast-tile">
            {
                weatherCardsWeek.map((value, index) => 
                <WeatherCard key={"week-tile-" + index.toString()} time={value.time} weather={value.weather} tempMain={value.tempMain} tempSub={value.tempSub}/>)
            }
        </div>
    );
}