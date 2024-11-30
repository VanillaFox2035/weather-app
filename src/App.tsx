import { useEffect } from "react";
import "./App.css";
import CurrentTile from "./components/CurrentTile";
import DayTile from "./components/DayTile";
import WeekTile from "./components/WeekTile";
import Controller from "./Controller";

export const controller: Controller = new Controller();

function App() {
	
	//  Initialize controller once
	useEffect(() => {
		controller.Initialize();
	}, [])

  	return (
    <>
		<div className="container">
			<CurrentTile location="新莊" locationSub="Xinzhuang" temperature={21} chanceOfRain={40} humidity={70}/>
			<DayTile/>
			<WeekTile/>
			<br/>
			<div className="credit">Designed and coded by VanillaFox2035</div>
		</div>
    </>
  	);
}

export default App
