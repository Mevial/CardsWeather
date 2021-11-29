import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppDispatch} from "../store";
import {weatherAPI} from "../../dal/weatherAPI";
import {CityType, Weather} from "../../types/types";
import {AxiosResponse} from "axios";
import moment from "moment";


type CurrentWeather = {
    cities: CityType[],
    weather: Weather,
    isLoading: boolean,
    response: Response,
    toggle: boolean
}

type Response = {
    status: number,
    message: string
}
const initialState: CurrentWeather = {
    cities: [],
    weather: {
        clouds: {
            all: 0,
        },
        coord: {
            lon: 0,
            lat: 0,
        },
        dt: 0,
        id: 0,
        main: {
            temp: 0,
            pressure: 0,
            humidity: 0,
            feels_like: 0,
            temp_max: 0,
            temp_min: 0,
        },
        name: '',
        sys: {
            id: 0,
            country: '',
            sunrise: 0,
            type: 0,
            sunset: 0,
        },
        wind: {
            speed: 0,
            deg: 0,
            gust: 0,
        },

    },
    isLoading: false,
    response: {
        status: 0,
        message: '',
    },
    toggle: false
};

const currentWeatherSlice = createSlice({
    name: 'current-weather',
    initialState,
    reducers: {
        changeToggle(state, action: PayloadAction<boolean>) {
            state.toggle = action.payload
        },
        fetchCurrentWeather(state) {
            state.isLoading = true
        },
        fetchCurrentWeatherSuccess(state, action: PayloadAction<AxiosResponse<Weather>>) {
            state.isLoading = false
            state.weather = action.payload.data
            state.response = {
                status: action.payload.status,
                message: action.payload.statusText,
            };
        },
        fetchCurrentWeatherError(state, action: PayloadAction<AxiosResponse<Weather>>) {
            state.isLoading = false
            state.response = {
                status: action.payload.status,
                message: action.payload.statusText,
            };
        },
        //number - it is CityId
        removeWeatherCard(state, action: PayloadAction<number>) {
            const index = state.cities.findIndex(city => city.id === action.payload)
            if (index > -1) {
                state.cities.splice(index, 1)
            }
        },
        addCityWeatherCard(state, action: PayloadAction<AxiosResponse<CityType>>) {
            const newCityId = action.payload.data.id
            const isExistingCityId = state.cities.find(cityId => cityId.id === newCityId)
            if (!isExistingCityId) {
                state.cities.unshift(action.payload.data)
            }
        },
        updateCityWeatherCard(state, action: PayloadAction<CityType>) {
            const newCityId = action.payload.id
            const cityIndex = state.cities.findIndex(cityId => cityId.id === newCityId)
            if (cityIndex > -1) {
                state.cities[cityIndex] = {...action.payload}
                console.log(action.payload)
            }
        },

        // updateTaskAC(state, action: PayloadAction<{ taskId: string, model: UpdateDomainTaskModelType, todolistId: string }>) {
        //     const tasks = state[action.payload.todolistId]
        //     const index = tasks.findIndex(t => t.id === action.payload.taskId)
        //     if (index > -1) {
        //         tasks[index] = {...tasks[index], ...action.payload.model}
        //     }
        // },
    },
});

export const {
    removeWeatherCard,
    addCityWeatherCard,
    updateCityWeatherCard,
    changeToggle
} = currentWeatherSlice.actions

export default currentWeatherSlice.reducer

//thunk
export const fetchCurrentWeather =
    (payload: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(currentWeatherSlice.actions.fetchCurrentWeather()) //dispatch action fetchCurrent(status=true)

            const res = await weatherAPI.getCurrentWeather(payload) //have response
            //1.Достать id
            //2.Достать id c Redux
            //3.Если в списке id с редакса такого id нет, запросцессить как обычно

            console.log(res.data.id)
            // const ID = useSelector<RootState>((state) => state.currentWeatherSliceReducer.cities)
            // console.log(ID)

            // @ts-ignore
            dispatch(addCityWeatherCard({
                data: {
                    name: res.data.name,
                    id: res.data.id,
                    country: res.data.sys.country,
                    temp: res.data.main.temp,
                    humidity: res.data.main.humidity,
                    press: res.data.main.pressure,
                    speed: res.data.wind.speed,
                    time: moment().format('MMMM Do YYYY, h:mm:ss a')
                }
            }))
            console.log(res.data)
            if (res.status === 200) {
                dispatch(currentWeatherSlice.actions.fetchCurrentWeatherSuccess(res))

            } else {
                dispatch(currentWeatherSlice.actions.fetchCurrentWeatherError(res))
            }
        } catch (error) {
//error.request - найти статус код, диспатчим и прокидываем в компоненту
            console.log((error))
        }

    };

export const updateWeatherCardId =
    (cityId: number) => async (dispatch: AppDispatch) => {
        try {
            dispatch(currentWeatherSlice.actions.fetchCurrentWeather()) //dispatch action fetchCurrent(status=true)
            const res = await weatherAPI.getCurrentWeatherById(cityId) //have response
            console.log(res.data.id)
            dispatch(updateCityWeatherCard({
                name: res.data.name,
                id: res.data.id,
                country: res.data.sys.country,
                temp: res.data.main.temp,
                humidity: res.data.main.humidity,
                press: res.data.main.pressure,
                speed: res.data.wind.speed,
                time: moment().format('MMMM Do YYYY, h:mm:ss a')
            }))
            console.log(res.data)
            if (res.status === 200) {
                dispatch(currentWeatherSlice.actions.fetchCurrentWeatherSuccess(res))

            } else {
                dispatch(currentWeatherSlice.actions.fetchCurrentWeatherError(res))
            }
        } catch (error) {
//error.request - найти статус код, диспатчим и прокидываем в компоненту
            console.log((error))
        }

    };



