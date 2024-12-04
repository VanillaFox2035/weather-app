import "./ForecastTile.css";
import WeatherCard, { IWeatherCard } from "./WeatherCard";
import { WeatherType } from "./WeatherIcon";

interface IDayTile
{
    weatherCardsDay?: IWeatherCard[]
}

export default function DayTile(props: IDayTile)
{
    const weatherCardsDay = [
        {
            "time": "06:00",
            "tempMain": 20,
            "weather": WeatherType.Blizzard,
            "isNight": false
        },
        {
            "time": "09:00",
            "tempMain": 22,
            "weather": WeatherType.Windy,
            "isNight": false
        },
        {
            "time": "12:00",
            "tempMain": 20,
            "weather": WeatherType.Clear,
            "isNight": false
        },
        {
            "time": "15:00",
            "tempMain": 22,
            "weather": WeatherType.PartlyCloudy,
            "isNight": false
        },
        {
            "time": "18:00",
            "tempMain": 20,
            "weather": WeatherType.MostlyClear,
            "isNight": true
        },
        {
            "time": "21:00",
            "tempMain": 22,
            "weather": WeatherType.Typhoon,
            "isNight": true
        },
        {
            "time": "24:00",
            "tempMain": 20,
            "weather": WeatherType.Umbrella,
            "isNight": true
        }
    ];

    return (
        <div className="forecast-tile">
            {
                weatherCardsDay.map((value, index) => 
                    <WeatherCard key={"day-tile-" + index.toString()} time={value.time} weather={value.weather} isNight={value.isNight} tempMain={value.tempMain}/>)
            }
        </div>
    );
}