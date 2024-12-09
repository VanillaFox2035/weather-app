import { useEffect } from "react";
import "./App.css";
import CurrentTile from "./components/CurrentTile";
import DayTile from "./components/DayTile";
import WeekTile from "./components/WeekTile";
import Host from "./Host";

export const host: Host = new Host();

function App() {
	
	let lastCheckTime: number = Date.now();

	//  Initialize controller once
	useEffect(() => {
		host.Initialize();
		setInterval(CheckTime, 500);
	}, []);

	// Request weather data on every multiple of 10 minute + 10 seconds 
	// (e.g 00:00:10, 00:10:10, 00:20:10... and so on)
	function CheckTime()
	{
		// Check minutes
		if (new Date().getMinutes() % 10 == 0)
		{
			if (new Date(lastCheckTime).getSeconds() == 9 &&
				new Date().getSeconds() == 10)
			{
				host.RequestWeatherData();
			}
			lastCheckTime = Date.now();
		}
	}

	useEffect(() => {
	}, [
		host.weatherCardCurrent,
		host.weatherCardDay,
		host.weatherCardWeek,
	]);

  	return (
    <>
		<div className="container">
			<CurrentTile weatherCard={host.weatherCardCurrent}/>
			<DayTile weatherCards={host.weatherCardDay}/>
			<WeekTile weatherCards={host.weatherCardWeek}/>
			<br/>
			<div className="credit">Designed and coded by VanillaFox2035</div>
		</div>
    </>
  	);
}

export default App;