import "./ForecastTile.css";
import WeatherCard, { IWeatherCard } from "./WeatherCard";

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
            "tempSub": 16
        },
        {
            "time": "Mon",
            "tempMain": 22,
            "tempSub": 15
        },
        {
            "time": "Tue",
            "tempMain": 20,
            "tempSub": 15
        },
        {
            "time": "Wed",
            "tempMain": 22,
            "tempSub": 15
        },
        {
            "time": "Thu",
            "tempMain": 20,
            "tempSub": 15
        },
        {
            "time": "Fri",
            "tempMain": 22,
            "tempSub": 14
        },
        {
            "time": "Sat",
            "tempMain": 20,
            "tempSub": 15
        }
    ];

    return (
        <div className="forecast-tile">
            {
                weatherCardsWeek.map((value, index) => 
                <WeatherCard key={"week-tile-" + index.toString()}  time={value.time} tempMain={value.tempMain} tempSub={value.tempSub}/>)
            }
        </div>
    );
}