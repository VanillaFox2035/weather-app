import { useEffect } from "react";
import "./App.css";
import CurrentTile from "./components/CurrentTile";
import DayTile from "./components/DayTile";
import WeekTile from "./components/WeekTile";
import Host from "./Host";

export const host: Host = new Host();

function App() {
	
	//  Initialize controller once
	useEffect(() => {
		host.Initialize();
	}, []);

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