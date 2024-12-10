//import fetch from "node-fetch";
import { ICurrentWeatherCard, defaultCard as defaultCardCurrent } from "./components/CurrentTile";
import { IDayWeatherCard, defaultCard as defaultCardDay } from "./components/DayTile";
import { IWeekWeatherCard, defaultCard as defaultCardWeek } from "./components/WeekTile";
import { WeatherType } from "./components/WeatherIcon";
import { host } from "./App";
import { DAYS } from "./Define";

export default class Host
{
    // Public accessed data
	private isInitialized = false;
    public weatherCardCurrent: ICurrentWeatherCard = {...defaultCardCurrent}; // Deep copy
    public weatherCardDay: IDayWeatherCard[] = [{...defaultCardDay}]; 
    public weatherCardWeek: IWeekWeatherCard[] = [{...defaultCardWeek}]; 

    constructor()
    {

    }

    public Initialize()
    {
		if (this.isInitialized)
		{
			return;
		}
		this.isInitialized = true;
        this.RequestWeatherData();
    }

    public RequestWeatherData()
    {
		console.log(`Requested weather data at ${this.GetDateString()}`);
        const url = "http://122.117.246.47:4200/";
        this.SendRequest(url + "CurrentWeather", this.ParseCurrentWeather, this.AlertError);
		this.SendRequest(url + "DayWeather", this.ParseDayWeather, this.AlertError);
		this.SendRequest(url + "WeekWeather", this.ParseWeekWeather, this.AlertError);
    }

	private ParseCurrentWeather(data: any)
	{
		// Parse data
		const stationData = data.records.Station[0];
		const weatherData = stationData.WeatherElement;
		const lastUpdatedTime = data.timestamp;
		const lastUpdatedHour = host.PadNumber(new Date(lastUpdatedTime).getHours().toString(), 2);
		const lastUpdatedMinute = host.PadNumber(new Date(lastUpdatedTime).getMinutes().toString(), 2);

		// Render fields
		host.weatherCardCurrent.location = "新莊"; // Locked for now
		host.weatherCardCurrent.locationSub = "Xinzhuang"; // Locked for now
		host.weatherCardCurrent.weather = host.TranslateWeather(weatherData.Weather);
		host.weatherCardCurrent.isNight = host.GetIsNight(new Date().getHours());
		host.weatherCardCurrent.temperature = Math.round(weatherData.AirTemperature);
		host.weatherCardCurrent.precipitation = weatherData.Now.Precipitation;
		host.weatherCardCurrent.humidity = weatherData.RelativeHumidity;
		host.weatherCardCurrent.lastUpdated = lastUpdatedHour + ":" + lastUpdatedMinute;
	}

	private ParseDayWeather(data: any)
	{
		// Parse data
		const stationData = data.records.Locations[0].Location[0];
		const weatherData = stationData.WeatherElement;

		const weatherArray = weatherData[8].Time;
		const temperatureArray = weatherData[0].Time;

		// Skip previous data
		let skip = 0;
		for (let i = 0; i < weatherArray.length; i++)
		{
			const time: string = weatherArray[i].StartTime;
			const date = host.GetDate(time);
			if (date >= Date.now())
			{
				skip = i;
				break;
			}
		}

		// Render fields
		const cardCount = 6;
		while (host.weatherCardDay.length < cardCount)
		{
			host.weatherCardDay.push({...defaultCardDay}); // Deep copy
		}
		for (let i = 0; i < cardCount; i++)
		{
			host.weatherCardDay[i].key = "day-tile-" + i.toString() + " " + Date().toString();
			const weatherIndex = i + skip;
			const time: string = weatherArray[weatherIndex].StartTime;
			const title: string = time.substring(11, 16);
			const hour: number = Number(title.substring(0, 2));
			const weather = weatherArray[weatherIndex].ElementValue[0].Weather;
			const temperature = temperatureArray[weatherIndex].ElementValue[0].Temperature;
			host.weatherCardDay[i].title = title;
			host.weatherCardDay[i].weather = host.TranslateWeather(weather);
			host.weatherCardDay[i].isNight = host.GetIsNight(hour);
			host.weatherCardDay[i].tempMain = temperature;
		}
	}

	private ParseWeekWeather(data: any)
	{
		// Parse data
		const stationData = data.records.Locations[0].Location[0];
		const weatherData = stationData.WeatherElement;
		const weatherArray = weatherData[12].Time;
		const tempMaxArray = weatherData[1].Time;
		const tempMinArray = weatherData[2].Time;

		// Skip today's data
		let skip = 0;
		for (let i = 0; i < weatherArray.length; i++)
		{
			const time: string = weatherArray[i].StartTime;
			const date: number = host.GetDate(time);
			const compareString = 	new Date().getFullYear().toString() + "-" +
									host.PadNumber((new Date().getMonth() + 1).toString(), 2) + "-" +
									host.PadNumber(new Date().getDate().toString(), 2) +
									"T23:59:59";
			if (date >= Date.parse(compareString))
			{
				skip = i;
				break;
			}
		}

		// Render fields
		const cardCount = 6;
		while (host.weatherCardWeek.length < cardCount)
		{
			host.weatherCardWeek.push({...defaultCardWeek}); // Deep copy
		}
		for (let i = 0; i < cardCount; i++)
		{
			host.weatherCardWeek[i].key = "week-tile-" + i.toString() + " " + Date().toString();
			const weatherIndex = i * 2 + skip;
			const time: string = weatherArray[weatherIndex + 0].StartTime;
			let title: string = "Tomorrow";
			if (i > 0)
			{
				const day = new Date(host.GetDate(time)).getDay(); // Get day of week
				title = DAYS[day];
			}
			host.weatherCardWeek[i].title = title;
			const weatherDay   = weatherArray[weatherIndex + 0].ElementValue[0].Weather;
			const tempMaxDay   = tempMaxArray[weatherIndex + 0].ElementValue[0].MaxTemperature;
			const tempMinDay   = tempMinArray[weatherIndex + 0].ElementValue[0].MinTemperature;
			if (weatherIndex + 1 < weatherArray.length)
			{
				//const weatherNight = weatherArray[weatherIndex + 1].elementValue[0].value;
				const tempMaxNight = tempMaxArray[weatherIndex + 1].ElementValue[0].MaxTemperature;
				const tempMinNight = tempMinArray[weatherIndex + 1].ElementValue[0].MinTemperature;
				host.weatherCardWeek[i].weather = host.TranslateWeather(weatherDay);
				host.weatherCardWeek[i].tempMain = Math.max(tempMaxDay, tempMaxNight);
				host.weatherCardWeek[i].tempSub = Math.min(tempMinDay, tempMinNight);
			}
			else
			{
				host.weatherCardWeek[i].weather = host.TranslateWeather(weatherDay);
				host.weatherCardWeek[i].tempMain = tempMaxDay;
				host.weatherCardWeek[i].tempSub = tempMinDay;
			}
		}
	}

	private AlertError(error: string)
	{
		console.error(error);
	}

	private async SendRequest(url: string, resolve: (data: object) => void, reject: (error: string) => void)
	{
		let data = {};
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

	public TranslateWeather(inputWx: string): WeatherType
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

	public GetDate(timeString: string): number
	{
		const standardTime = timeString.replace(" ", "T");
		return Date.parse(standardTime);
	}

	public GetIsNight(hour: number): boolean
	{
		let result = false;
		if (hour <= 5 || hour >= 18)
		{
			result = true;
		}
		return result;
	}

	// Pad number
	public PadNumber(input: string, pad: number): string
	{
		let result = input;
		while(result.length < pad)
		{
			result = "0" + result;
		}
		return result;
	}
	
		// For printing date
	private GetDateString(): string
	{
		const year = new Date().getFullYear().toString();
		const month = this.PadNumber((new Date().getMonth() + 1).toString(), 2);
		const date = this.PadNumber(new Date().getDate().toString(), 2);
		const hour = this.PadNumber(new Date().getHours().toString(), 2);
		const minute = this.PadNumber(new Date().getMinutes().toString(), 2);
		const second = this.PadNumber(new Date().getSeconds().toString(), 2);
		return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
	}
}