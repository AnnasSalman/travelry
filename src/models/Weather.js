import axios from 'axios'
import Keys from "../constants/Keys";

class Weather {
    constructor(lat, lng) {
        this._lat = lat;
        this._lng = lng;
    }

    getWeather = async(days) => {
        try{
            const weather = await axios.request({
                url: 'https://api.openweathermap.org/data/2.5/onecall',
                method: 'get',
                params:{
                    exclude: 'minutely,hourly',
                    lat: this._lat,
                    lon: this._lng,
                    cnt: days,
                    units: 'metric',
                    APPID: Keys.weather
                }
            })
            return weather.data
        }
        catch(e){
            return e
        }
    }
}

export default Weather
