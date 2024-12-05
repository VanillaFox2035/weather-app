//import fetch from "node-fetch";
import { ICurrentWeatherCard, defaultCard as defaultCardCurrent } from "./components/CurrentTile";
import { IDayWeatherCard, defaultCard as defaultCardDay } from "./components/DayTile";
import { IWeekWeatherCard, defaultCard as defaultCardWeek } from "./components/WeekTile";
import { WeatherType } from "./components/WeatherIcon";
import { host } from "./App";

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
        this.SendRequest(url + "CurrentWeather", this.ParseCurrentWeather, this.AlertError);
		//this.SendRequest(url + "DayWeather", this.ParseDayWeather, this.AlertError);
		//this.SendRequest(url + "WeekWeather", this.ParseWeekWeather, this.AlertError);
    }

	private ParseCurrentWeather(data: JSON)
	{
		console.log("current weather", data);

		// Set render field
		host.weatherCardCurrent.location = "新莊"; // Locked for now
		host.weatherCardCurrent.locationSub = "Xinzhuang"; // Locked for now
		host.weatherCardCurrent.weather = WeatherType.Tornado;
		host.weatherCardCurrent.isNight = false;
		host.weatherCardCurrent.temperature = 10;
		host.weatherCardCurrent.precipitation = 15;
		host.weatherCardCurrent.humidity = 80;
		
	}

	private ParseDayWeather(data: JSON)
	{
		// Render fields
	}

	private ParseWeekWeather(data: JSON)
	{
		// Render fields
	}

	private AlertError(error: string)
	{
		console.error(error);
	}

	private async SendRequest(url: string, resolve: (data: JSON) => void, reject: (error: string) => void)
	{
		let data = JSON.parse("{}");
		try
		{
			const response = await fetch(url);
			if (!response.ok)
			{
				reject(`Response status: ${response.status}`);
			}
			data = await response.json();
		}
		catch (e)
		{
			reject(`Fetching ${url} failed! ${e}`);
		}
		resolve(data);
	}

	private TranslateWeather(inputWx: string): WeatherType
	{
		// Record word inclusions
		const clear: boolean = inputWx.includes("晴");
		const partlyCloudy: boolean = inputWx.includes("多雲");
		const overcast: boolean = inputWx.includes("陰");
		const thunder: boolean = inputWx.includes("雷");
		const scatteredRain: boolean = inputWx.includes("局部") || inputWx.includes("短暫");
		const showers: boolean = inputWx.includes("雨");
		const snow: boolean = inputWx.includes("雪");
		const fog: boolean = inputWx.includes("霧");

		// Decides weather
		let weather = WeatherType.Unknown;
		if (clear)
		{
			weather = WeatherType.Clear;
			if (partlyCloudy)
			{
				if (inputWx.indexOf("晴") < inputWx.indexOf("多雲"))
				{
					weather = WeatherType.MostlyClear;
				}
				else
				{
					weather = WeatherType.PartlyCloudy;
				}
			} 
			if (overcast) weather = WeatherType.MostlyCloudy;
			if (showers) weather = WeatherType.ScatteredShowers;
			if (scatteredRain) weather = WeatherType.ScatteredShowers;
			if (thunder) weather = WeatherType.ScatteredThunderstorms;
			if (snow) weather = WeatherType.ScatteredSnow;
		}
		else if (partlyCloudy)
		{
			weather = WeatherType.PartlyCloudy;
			if (overcast) weather = WeatherType.Cloudy;
			if (showers) weather = WeatherType.ShowersRain;
			if (scatteredRain) weather = WeatherType.Drizzle;
			if (thunder) weather = WeatherType.Thunderstorms;
			if (snow) weather = WeatherType.ShowersSnow;
		}
		else if (overcast)
		{
			weather = WeatherType.Cloudy;
			if (showers) weather = WeatherType.ShowersRain;
			if (scatteredRain) weather = WeatherType.Drizzle;
			if (thunder) weather = WeatherType.Thunderstorms;
			if (snow) weather = WeatherType.ShowersSnow;
		}
		else if (thunder)
		{
			weather = WeatherType.Thunderstorms;
		}
		else if (scatteredRain)
		{
			weather = WeatherType.Drizzle;
		}
		else if (showers)
		{
			weather = WeatherType.ShowersRain;
		}
		else if (snow)
		{
			weather = WeatherType.ShowersSnow;
		}
		else if (fog)
		{
			weather = WeatherType.Haze;
		}

		return weather;
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
