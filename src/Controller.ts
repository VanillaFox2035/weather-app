//import fetch from "node-fetch";

export default class Controller
{
    constructor()
    {

    }

    public Initialize()
    {
        console.log("Conrtoller initializing!");
        //this.RequestWeatherData();
        this.SetWeatherData();
    }

    public RequestWeatherData()
    {
        /*
        const url = "http://localhost:4200/";
        // Current weather
        fetch(url + "CurrentWeather")
        .then((data) => {
            console.log("data", data);
        })
        .catch((e) => {
            console.log(`Fetching current weather failed! ${e}`);
        });
        
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

    SetWeatherData()
    {
        console.log("Set weather data");
    }  
}