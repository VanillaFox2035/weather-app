import "./CurrentTile.css";
import { useEffect, useState } from "react";
import WeatherIcon, { WeatherType } from "./WeatherIcon";
import { DAYS, MONTHS } from "../Define";
import DropdownMenu, {IDropDownOptions} from "./DropdownMenu";

export interface ICurrentWeatherCard
{
    lastUpdated: string;
    location: string;
    locationSub?: string;
    weather: WeatherType;
    weatherString: string;
    isNight: boolean;
    temperature: number;
    precipitation: number;
    humidity: number;
}

export const defaultCard: ICurrentWeatherCard = 
{
    lastUpdated: "-",
    location: "-",
    locationSub: "-",
    weather: WeatherType.Unknown,
    weatherString: "-",
    isNight: false,
    temperature: -99,
    precipitation: -99,
    humidity: -99
}

interface ICurrentTile
{    
    weatherCard: ICurrentWeatherCard;
    width: number;
    locationList: any[];
}

export default function CurrentTile(props: ICurrentTile)
{
    // Weather update
    const [weatherCard, setWeatherCard] = useState(defaultCard);

    // Time update
    const [time, setTime] = useState("00:00");
    const [timeSecond, setTimeSecond] = useState("00");
    const [date, setDate] = useState("Sunday");
    const isMobile = props.width <= 800;
    const locationList = props.locationList;

    // Menu control
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function SetTimeTile()
    {
        setTime(GetFormattedTime());
        setTimeSecond(GetFormattedTimeSecond());
        setDate(GetFormattedDate());
    }

    useEffect(() => {
        // Update on prop change
        setWeatherCard(props.weatherCard);

        // Update every 0.1 seconds
        SetTimeTile();
        const interval = setInterval(SetTimeTile, 100);

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

    function CheckNotAvailable(input :number): string
	{
		if (input.toString() === "-99")
		{
			return "?";
		}
		return input.toString();
	}

    function OnOpenDropdownMenu() 
    {
        setIsMenuOpen(true);
    }

    function GetOptions(): IDropDownOptions[]
    {
        const options: IDropDownOptions[] = locationList.map((value) => ({
            name: value.title,
            link: import.meta.env.BASE_URL + "/?location=" + value.title
        }));
        return options;
    }

    return (
        <>
        {
            isMobile ? 
            // Mobile site
            <>
            <div className="last-updated-time">Last updated: {weatherCard.lastUpdated}</div>
            <div className="current-tile">
            <div className="current-tile-content">
                <div className="left-block">
                     <div className="flex-block">
                        <img className="location-icon"  width="18px" src={import.meta.env.BASE_URL + "/location.svg"} onClick={() => {OnOpenDropdownMenu()}}/>
                        <h2 className="location-text" onClick={() => {OnOpenDropdownMenu()}}>{weatherCard.location}</h2>
                        <h2 className="location-text-sub" onClick={() => {OnOpenDropdownMenu()}}>{weatherCard.locationSub}</h2>                              
                    </div>           
                    <div className="flex-block">
                        {isMenuOpen && <DropdownMenu options={GetOptions()} onblur={() => {setIsMenuOpen(false);}}/>}
                        <h1 className="current-temperature">{CheckNotAvailable(weatherCard.temperature)}°</h1>
                    </div>
                    <div className="flex-block">
                        <h4 className="weather-detail">Humidity: {CheckNotAvailable(weatherCard.humidity)}%</h4>
                    </div>
                </div>
                <div className="right-block">
                    <WeatherIcon weather={weatherCard.weather} isNight={weatherCard.isNight} width={"150px"} title={weatherCard.weatherString}/> 
                </div>
            </div>
            <div className="current-tile-matte"></div>
            </div>
            </>
            :
            // Desktopn site
            <>
            <div className="last-updated-time">Last updated: {weatherCard.lastUpdated}</div>
            <div className="current-tile">
            <div className="current-tile-content">
                <div className="left-block">
                    <div className="flex-block">
                        <img className="location-icon" width="18px" src={import.meta.env.BASE_URL + "/location.svg"} onClick={() => {OnOpenDropdownMenu()}}/>
                        <h2 className="location-text" onClick={() => {OnOpenDropdownMenu()}}>{weatherCard.location}</h2>
                        <h2 className="location-text-sub" onClick={() => {OnOpenDropdownMenu()}}>{weatherCard.locationSub}</h2>
                    </div>

                    <div className="flex-block">
                        { isMenuOpen && <DropdownMenu options={GetOptions()} onblur={() => {setIsMenuOpen(false);}}/>}
                        <h1 className="current-time">{time}</h1>
                        <h2 className="current-time-second">{timeSecond}</h2>
                    </div>

                    <h4 className="current-date">{date}</h4>

                </div>
                <div className="right-block">
                    <WeatherIcon weather={weatherCard.weather} isNight={weatherCard.isNight} width="150px" title={weatherCard.weatherString}/> 
                    <h1 className="current-temperature">{CheckNotAvailable(weatherCard.temperature)}°</h1>
                    {/*<h4 className="weather-detail">Precipitation: {CheckNotAvailable(weatherCard.precipitation * 10)}%</h4>*/}
                    <h4 className="weather-detail">Humidity: {CheckNotAvailable(weatherCard.humidity)}%</h4>
                </div>
            </div>
            <div className="current-tile-matte"></div>
            </div>
            </>
        }
        </>
    );
}