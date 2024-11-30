import "./App.css";
import CurrentTile from "./components/CurrentTile";
import DayTile from "./components/DayTile";
import WeekTile from "./components/WeekTile";

function App() {
  	return (
    <>
		<div className="container">
			<CurrentTile/>
			<DayTile/>
			<WeekTile/>
			<br/>
			<div className="credit">Designed and coded by VanillaFox2035</div>
		</div>
    </>
  	);
}

export default App
