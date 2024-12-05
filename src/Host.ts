//import fetch from "node-fetch";
import { ICurrentWeatherCard, defaultCard as defaultCardCurrent } from "./components/CurrentTile";
import { IDayWeatherCard, defaultCard as defaultCardDay } from "./components/DayTile";
import { IWeekWeatherCard, defaultCard as defaultCardWeek } from "./components/WeekTile";
import { WeatherType } from "./components/WeatherIcon";

export default class Host
{
    // Public accessed data
	private isInitialized = false;
    public weatherCardCurrent: ICurrentWeatherCard = defaultCardCurrent;
    public weatherCardDay: IDayWeatherCard[] = [defaultCardDay];
    public weatherCardWeek: IWeekWeatherCard[] = [defaultCardWeek];

    constructor()
    {
		this.weatherCardCurrent = dWeatherCardCurrent;
		this.weatherCardDay = dWeatherCardsDay;
		this.weatherCardWeek = dWeatherCardsWeek;
    }

    public Initialize()
    {
		if (this.isInitialized)
		{
			return;
		}
		this.isInitialized = true;
        console.log("Conrtoller initializing!");
        this.RequestWeatherData();

    }

    public RequestWeatherData()
    {
        
        const url = "http://localhost:4200/";
        // Current weather
        fetch(url + "CurrentWeather")
        .then((data) => {
            console.log("data", data);
        })
        .catch((e) => {
            console.log(`Fetching current weather failed! ${e}`);
        });
        /*
        // Day weather
        fetch(url + "DayWeather")
        .then((data) => {

        })
        .catch((e) => {
            console.log(`Fetching day weather failed! ${e}`);
        });

        // Week weather
        fetch(url + "WeekWeather")
        .then((data) => {

        })
        .catch((e) => {
            console.log(`Fetching week weather failed! ${e}`);
        });
        */
    }

    private SetWeatherData()
    {
        console.log("Set weather data");
    }  

	private TranslateWeather(inputWx: string): WeatherType
	{

		

		return WeatherType.Clear;
	}

}

const dWeatherCardCurrent = 
{
	location: "新莊",
    locationSub: "Xinzhuang",
    weather: WeatherType.Clear,
    isNight: false,
    temperature: 25,
    precipitation: 12,
    humidity: 77
}

const dWeatherCardsDay = [
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

const dWeatherCardsWeek = [
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
