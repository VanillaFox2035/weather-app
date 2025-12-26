import { useState, useEffect } from 'react'
import './App.css';
import CurrentTile from "./components/CurrentTile";
import DayTile from "./components/DayTile";
import WeekTile from "./components/WeekTile";
import Host from "./Host";

export const host: Host = new Host();

function App() {
  	const [width, setWidth] = useState<number>(window.innerWidth);
	function onWindowSizeChange() {
		setWidth(window.innerWidth);
	}

	let lastCheckTime: number = Date.now();
	const [key, setKey] = useState("app");

	//  Initialize controller once
	useEffect(() => {
		window.addEventListener('resize', onWindowSizeChange);
		host.Initialize();
		setInterval(CheckTime, 100);
	}, []);

	// Request weather data on every multiple of 10 minute + 10 seconds 
	// (e.g 00:00:10, 00:10:10, 00:20:10... and so on)
	function CheckTime()
	{
		setKey(host.weatherCardDay[0].key + "-app");
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

	// Force update if left the browser tab for more than 1 minute
	window.onfocus = () => {
		if (Date.now() - lastCheckTime > 60 * 1000)
		{
			host.RequestWeatherData();
			lastCheckTime = Date.now();
		}
		else
		{
			console.log("Update time not enough");
		}
	}

	window.onblur = () => {
		
	}

	useEffect(() => {
	}, [
		host.weatherCardCurrent,
		host.weatherCardDay,
		host.weatherCardWeek,
	]);
	
  	return (
    <>
      <div className="container" key={key}>
			<CurrentTile weatherCard={host.weatherCardCurrent} width={width} locationList={host.locationList}/>
			<DayTile weatherCards={host.weatherCardDay} width={width}/>
			<WeekTile weatherCards={host.weatherCardWeek} width={width}/>
			<br/>
			<div className="credit">Designed and coded by VanillaFox2035</div>
		  </div>
    </>
  	);
}

export default App
