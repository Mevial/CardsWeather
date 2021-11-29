import axios from 'axios'
import {Weather} from "../types/types";

const KEY_ID = "161e3d9231985b40493daa0a166386ca";
const METRIC = '&units=metric'

const instance = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/weather'
})

// api
export const weatherAPI = {
    getCurrentWeather(city: string) {
        return instance.get<Weather>(`?q=${city}&appid=${KEY_ID}${METRIC}`);
    },
    getCurrentWeatherByCoordinates(lat: number, lon: number) {
        return instance.get<Weather>(`?lat=${lat}&lon=${lon}&appid=${KEY_ID}${METRIC}`);
    },
    getCurrentWeatherById(id: number) {
        return instance.get<Weather>(`?id=${id}&appid=${KEY_ID}${METRIC}`);
    }
};
