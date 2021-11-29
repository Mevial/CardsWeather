import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {CityType, Weather} from "../../types/types";
import moment from "moment"
import {useCustomDispatch} from "../../customHook/customHook";
import {useSelector} from "react-redux";
import {RootState} from "../../bll/store";
import {removeWeatherCard, updateCityWeatherCard} from "../../bll/slices/currentWeatherSlice";


export type WeatherCardPropsType = {
    weather: Weather
}


export const WeatherCard = ({
                                weather,
                            }: WeatherCardPropsType) => {

    const dispatch = useCustomDispatch();
    const cities = useSelector<RootState, CityType[]>(state => state.currentWeatherSliceReducer.cities)

    const deleteOneCty = (cityId: number) => {
        dispatch(removeWeatherCard(cityId))
    }
    const refreshOneCity = (city: CityType) => {
        dispatch(updateCityWeatherCard(city))
    }

    // const deleteOneCity = (cityId: number) => {
    //     dispatch(removeWeatherCard({id: 625144, press: 1, temp: 1, country: 'da', speed: 1, humidity: 1, name: 'das'}))
    // }
//dispatch thunk

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
                                        <CardContent>
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
                                                Последнее обновление данных: {moment().format('MMMM Do YYYY, h:mm:ss a')}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button variant="contained" size="small" color={"warning"}
                                                    onClick={() => {
                                                        deleteOneCty(CityId)
                                                    }}>Delete</Button>
                                            <Button variant="contained" size="small" color={"success"}
                                                    onClick={() => {
                                                        refreshOneCity(city)
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
