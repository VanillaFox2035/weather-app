import "./CurrentTile.css";
import WeatherIcon from "./WeatherIcon";

interface ICurrentTile
{

}

export default function CurrentTile(props: ICurrentTile)
{
    return (
        <div className="current-tile">
            <div className="left-block">

                <div className="flex-block">
                    <img width="18px" src="/location.svg"/>
                    <h2 className="location-text">新莊</h2>
                    <h2 className="location-text-sub">Xinzhuang</h2>
                </div>

                <div className="flex-block">
                    <h1 className="current-time">13:02</h1>
                    <h2 className="current-time-second">:38</h2>
                </div>

                <h4 className="current-date">Saturday, November 30</h4>
                
            </div>
            <div className="right-block">
                <WeatherIcon width="150px"/> 
                <h1 className="current-temperature">25°</h1>
                <h4 className="weather-detail">Chance of rain: 30%</h4>
                <h4 className="weather-detail">Humidity: 30%</h4>
            </div>
        </div>
    );
}