import React, {useEffect} from 'react';
import style from './App.module.css';
import {Header} from "./header/Header";
import {WeatherCard} from "../components/weatherCard/WeatherCard";
import {selectCurrentWeatherData, useCustomSelector} from "../customHook/customHook";
import {setItemLocalStorage} from "../bll/slices/currentWeatherSlice";
import {useDispatch} from "react-redux";
import {CityType} from "../types/types";


function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        const result = localStorage.getItem("value")
        if (result) {
            const testValue: Array<CityType> = JSON.parse(result)
            dispatch(setItemLocalStorage({testValue}))
        }
    }, [])

    const {weather} = useCustomSelector(selectCurrentWeatherData)
    return (
        <div className={style.app}>
            <Header/>
            <div className={style.Cards}><WeatherCard weather={weather}/></div>

        </div>
    );
}

export default App;
