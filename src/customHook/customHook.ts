import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../bll/store";

export const useCustomDispatch = () => useDispatch<AppDispatch>() //ts

export const useCustomSelector: TypedUseSelectorHook<RootState> = useSelector

export const selectCurrentWeatherData = (state: RootState) => state.currentWeatherSliceReducer


