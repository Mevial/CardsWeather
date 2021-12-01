import styles from './Header.module.css'
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {fetchCurrentWeather, getCityTC} from "../../bll/slices/currentWeatherSlice";
import {useDispatch} from "react-redux";

export const Header = () => {
    const dispatch = useDispatch();
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
