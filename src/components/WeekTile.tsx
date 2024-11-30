import "./ForecastTile.css";
import WeatherCard from "./WeatherCard";

interface IWeekTile
{

}

export default function WeekTile(props: IWeekTile)
{
    return (
        <div className="forecast-tile">
            <WeatherCard/>
            <WeatherCard/>
            <WeatherCard/>
            <WeatherCard/>
            <WeatherCard/>
            <WeatherCard/>
            <WeatherCard/>
        </div>
    );
}