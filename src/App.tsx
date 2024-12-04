import { useEffect } from "react";
import "./App.css";
import CurrentTile from "./components/CurrentTile";
import DayTile from "./components/DayTile";
import WeekTile from "./components/WeekTile";
import Controller from "./Controller";
import { WeatherType } from "./components/WeatherIcon";

export const controller: Controller = new Controller();

function App() {
	
	//  Initialize controller once
	useEffect(() => {
		controller.Initialize();
	}, [])

  	return (
    <>
		<div className="container">
			<CurrentTile location="新莊" locationSub="Xinzhuang" weather={WeatherType.PartlyCloudy} isNight={false} temperature={21} precipitation={40} humidity={70}/>
			<DayTile weatherCards={weatherCardsDay}/>
			<WeekTile weatherCards={weatherCardsWeek}/>
			<br/>
			<div className="credit">Designed and coded by VanillaFox2035</div>
		</div>
    </>
  	);
}

export default App;


const weatherCardsDay = [
	{
		"title": "06:00",
		"tempMain": 20,
		"weather": WeatherType.Blizzard,
		"isNight": false
	},
	{
		"title": "09:00",
		"tempMain": 22,
		"weather": WeatherType.Windy,
		"isNight": false
	},
	{
		"title": "12:00",
		"tempMain": 20,
		"weather": WeatherType.Clear,
		"isNight": false
	},
	{
		"title": "15:00",
		"tempMain": 22,
		"weather": WeatherType.PartlyCloudy,
		"isNight": false
	},
	{
		"title": "18:00",
		"tempMain": 20,
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
		"tempMain": 20,
		"weather": WeatherType.Umbrella,
		"isNight": true
	}
];

const weatherCardsWeek = [
	{
		"title": "Sun",
		"tempMain": 20,
		"tempSub": 16,
		"weather": WeatherType.Clear
	},
	{
		"title": "Mon",
		"tempMain": 22,
		"tempSub": 15,
		"weather": WeatherType.Thunderstorms
	},
	{
		"title": "Tue",
		"tempMain": 20,
		"tempSub": 15,
		"weather": WeatherType.VeryHot
	},
	{
		"title": "Wed",
		"tempMain": 22,
		"tempSub": 15,
		"weather": WeatherType.VeryCold
	},
	{
		"title": "Thu",
		"tempMain": 20,
		"tempSub": 15,
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
		"tempMain": 20,
		"tempSub": 15,
		"weather": WeatherType.BlowingSnow
	}
];
