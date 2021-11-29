import React, {useEffect} from 'react';
import style from './App.module.css';
import {Header} from "./header/Header";
import {WeatherCard} from "../components/weatherCard/WeatherCard";
import {selectCurrentWeatherData, useCustomDispatch, useCustomSelector} from "../customHook/customHook";
import {fetchCurrentWeather} from "../bll/slices/currentWeatherSlice";


function App() {

    const dispatch = useCustomDispatch();
    useEffect(() => {
        dispatch(fetchCurrentWeather('Minsk'))
    }, [])

        const {weather} = useCustomSelector(selectCurrentWeatherData)

    // const [lat, setLat] = useState([]);
    // const [long, setLong] = useState([]);
    // const [data, setData] = useState([]);


    return (
        <div className={style.app}>
            Это приложение должно работать с погодой
            <Header/>
            <WeatherCard weather={weather}/>
        </div>
    );
}

export default App;
