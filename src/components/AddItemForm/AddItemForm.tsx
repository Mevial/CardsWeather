import React, {ChangeEvent, FormEvent, useCallback, useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import {AddBox} from '@mui/icons-material';
import {Button, Checkbox} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../bll/store";
import {CityType} from "../../types/types";
import {changeToggle, updateWeatherCardId} from "../../bll/slices/currentWeatherSlice";
import styles from './AddItemForm.module.css'
type AddItemFormPropsType = {
    addItem: (title: string) => void
}
export const AddItemForm = React.memo(function ({addItem}: AddItemFormPropsType) {
    const dispatch = useDispatch()
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)
    const cities = useSelector<RootState, CityType[]>(state => state.currentWeatherSliceReducer.cities)
    const toggle = useSelector<RootState, boolean>(state => state.currentWeatherSliceReducer.toggle)

    const addItemHandler = () => {
        if (title.trim() !== '') {
            addItem(title);
            setTitle('');
        } else {
            setError('Title is required');
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onFormSubmit = (e: FormEvent<HTMLDivElement>) => {
        if (error !== null) {
            setError(null);

        }
        addItemHandler();

    }
    const changeHandlerRadio = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeToggle(e.currentTarget.checked))

    }, [dispatch])

    useEffect(() => {
        let id: any
        if (!toggle) {
            return () => clearInterval(id)
        }
        if (cities.length > 0) {
            id = setInterval(() => {
                for (let i = 0; i < cities.length; i++) {
                    dispatch(updateWeatherCardId((cities[i].id)))
                }
            }, 5000)
            return () => clearInterval(id)
        }
    }, [toggle,cities,dispatch])

    return <div className={styles.Container}>
        <div className={styles.CityForm}><TextField variant="outlined"
                        error={!!error}
                        value={title}
                        onChange={onChangeHandler}
                        onSubmit={onFormSubmit}
                        label="City"
                        helperText={error}
                        color={'secondary'}
        />
            <IconButton color="primary" onClick={addItemHandler}>
                <AddBox/>
            </IconButton>
        </div>

        <Button variant="contained" size={"small"}>update every 5sec <Checkbox
            color="secondary"
            onChange={changeHandlerRadio}/></Button>

    </div>
})
