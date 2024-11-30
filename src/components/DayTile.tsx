import "./ForecastTile.css";
import WeatherCard from "./WeatherCard";

interface IDayTile
{

}

export default function DayTile(props: IDayTile)
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