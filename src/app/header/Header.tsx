import styles from './Header.module.css'
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {useCustomDispatch} from "../../customHook/customHook";
import {fetchCurrentWeather, getCityTC} from "../../bll/slices/currentWeatherSlice";
import {useSelector} from "react-redux";
import {RootState} from "../../bll/store";
import {CityType} from "../../types/types";

export const Header = () => {
    const dispatch = useCustomDispatch();
    const cities = useSelector<RootState, CityType[]>(state => state.currentWeatherSliceReducer.cities)
    console.log(cities)
    const addCity = (title: string) => {
        dispatch(fetchCurrentWeather(title))
        dispatch(getCityTC())
    }
    return (
        <div className={styles.header}>
            <div>
                <AddItemForm addItem={addCity}/>
            </div>
        </div>
    )
}
