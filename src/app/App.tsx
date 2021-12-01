import React, {useEffect} from 'react';
import style from './App.module.css';
import {Header} from "./header/Header";
import {WeatherCard} from "../components/weatherCard/WeatherCard";
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

    return (
        <div className={style.app}>
            <Header/>
            <div className={style.Cards}><WeatherCard/></div>

        </div>
    );
}

export default App;
