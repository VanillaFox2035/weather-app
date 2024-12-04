import "./ForecastTile.css";
import WeatherCard, { IWeatherCard } from "./WeatherCard";

interface IDayTile
{
    weatherCardsDay?: IWeatherCard[]
}

export default function DayTile(props: IDayTile)
{
    const weatherCardsDay = [
        {
            "time": "06:00",
            "tempMain": 20
        },
        {
            "time": "09:00",
            "tempMain": 22
        },
        {
            "time": "12:00",
            "tempMain": 20
        },
        {
            "time": "15:00",
            "tempMain": 22
        },
        {
            "time": "18:00",
            "tempMain": 20
        },
        {
            "time": "21:00",
            "tempMain": 22
        },
        {
            "time": "24:00",
            "tempMain": 20
        }
    ];

    return (
        <div className="forecast-tile">
            {
                weatherCardsDay.map((value, index) => 
                    <WeatherCard key={"day-tile-" + index.toString()} time={value.time} tempMain={value.tempMain}/>)
            }
        </div>
    );
}