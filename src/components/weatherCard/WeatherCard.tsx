import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {CityType, Weather} from "../../types/types";
import {useCustomDispatch} from "../../customHook/customHook";
import {useSelector} from "react-redux";
import {RootState} from "../../bll/store";
import {removeWeatherCard, updateWeatherCardId} from "../../bll/slices/currentWeatherSlice";


export type WeatherCardPropsType = {
    weather: Weather
}

export const WeatherCard = ({
                                weather,
                            }: WeatherCardPropsType) => {

    const dispatch = useCustomDispatch();
    const cities = useSelector<RootState, CityType[]>(state => state.currentWeatherSliceReducer.cities)

    const deleteOneCty = (cityId: number) => {
        const newCities = cities.filter((city) => cityId !== city.id);
        localStorage.setItem('value', JSON.stringify(newCities));
        dispatch(removeWeatherCard(cityId))
    }

    const refreshOneCity = (id: number) => {
        dispatch(updateWeatherCardId(id))
    }
    return (
        <>
            {cities.length === 0
                ? (<div>you have no cities saved</div>)
                : (cities.map((city) => {
                            const City = city.name
                            const Country = city.country
                            const Temp = city.temp
                            const Hum = city.humidity
                            const Pressure = city.press
                            const SpeedWind = city.speed
                            const CityId = city.id
                            return (
                                <div key={city.id}>
                                    <Card sx={{minWidth: 275, minHeight: 250, maxWidth: 350, maxHeight: 300}}>
                                        <CardContent className='Wrapper'>
                                            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                                Город: {City}, {Country}
                                            </Typography>
                                            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                                Температура: {Math.floor(Temp)}°C
                                            </Typography>
                                            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                                Влажность: {Hum}%
                                            </Typography>
                                            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                                Атмосферное давление: {Pressure} hpa
                                            </Typography>
                                            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                                Сила и направление ветра: {SpeedWind}
                                            </Typography>
                                            <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                                                Последнее обновление данных: {city.time}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button variant="contained" size="small" color={"warning"}
                                                    onClick={() => {
                                                        deleteOneCty(CityId)
                                                    }}>Delete</Button>
                                            <Button variant="contained" size="small" color={"success"}
                                                    onClick={() => {
                                                        refreshOneCity(CityId)
                                                    }}>Refresh</Button>
                                        </CardActions>
                                    </Card>
                                </div>

                            );

                        }
                    )
                )
            }
        </>
    )
}
