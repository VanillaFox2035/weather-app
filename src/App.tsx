import { useEffect } from "react";
import "./App.css";
import CurrentTile from "./components/CurrentTile";
import DayTile from "./components/DayTile";
import WeekTile from "./components/WeekTile";
import Host from "./Host";
import { WeatherType } from "./components/WeatherIcon";

export const host: Host = new Host();

function App() {
	
	//  Initialize controller once
	useEffect(() => {
		host.Initialize();
	}, []);

	useEffect(() => {
		
	}, [weatherCardCurrent, weatherCardsDay, weatherCardsWeek]);

  	return (
    <>
		<div className="container">
			<CurrentTile weatherCard={weatherCardCurrent}/>
			<DayTile weatherCards={weatherCardsDay}/>
			<WeekTile weatherCards={weatherCardsWeek}/>
			<br/>
			<div className="credit">Designed and coded by VanillaFox2035</div>
		</div>
    </>
  	);
}

export default App;

const weatherCardCurrent = 
{
	location: "新莊",
    locationSub: "Xinzhuang",
    weather: WeatherType.Clear,
    isNight: false,
    temperature: 25,
    precipitation: 12,
    humidity: 77
}

const weatherCardsDay = [
	{
		"title": "06:00",
		"tempMain": 10,
		"weather": WeatherType.Blizzard,
		"isNight": false
	},
	{
		"title": "09:00",
		"tempMain": 12,
		"weather": WeatherType.Flurries,
		"isNight": false
	},
	{
		"title": "12:00",
		"tempMain": 51,
		"weather": WeatherType.Clear,
		"isNight": false
	},
	{
		"title": "15:00",
		"tempMain": 55,
		"weather": WeatherType.PartlyCloudy,
		"isNight": false
	},
	{
		"title": "18:00",
		"tempMain": 26,
		"weather": WeatherType.MostlyClear,
		"isNight": true
	},
	{
		"title": "21:00",
		"tempMain": 22,
		"weather": WeatherType.Typhoon,
		"isNight": true
	},
	{
		"title": "24:00",
		"tempMain": -2,
		"weather": WeatherType.Umbrella,
		"isNight": true
	}
];

const weatherCardsWeek = [
	{
		"title": "Sun",
		"tempMain": 2,
		"tempSub": -50,
		"weather": WeatherType.Clear
	},
	{
		"title": "Mon",
		"tempMain": 26,
		"tempSub": 15,
		"weather": WeatherType.Thunderstorms
	},
	{
		"title": "Tue",
		"tempMain": 50,
		"tempSub": 18,
		"weather": WeatherType.VeryHot
	},
	{
		"title": "Wed",
		"tempMain": 20,
		"tempSub": -15,
		"weather": WeatherType.VeryCold
	},
	{
		"title": "Thu",
		"tempMain": -20,
		"tempSub": -25,
		"weather": WeatherType.Cloudy
	},
	{
		"title": "Fri",
		"tempMain": 22,
		"tempSub": 14,
		"weather": WeatherType.Icy
	},
	{
		"title": "Sat",
		"tempMain": 7,
		"tempSub": 5,
		"weather": WeatherType.BlowingSnow
	}
];
