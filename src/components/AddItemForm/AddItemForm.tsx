import React, {ChangeEvent, FormEvent, useState} from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import {AddBox} from '@mui/icons-material';
import {Button, Checkbox} from "@mui/material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
    updateData: () => void;
}

export const AddItemForm = React.memo(function ({addItem, updateData}: AddItemFormPropsType) {
    console.log('AddItemForm called')

    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

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
        if ('click') {
            addItemHandler();
        }
    }


    return <div>
        <TextField variant="outlined"
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

        <Button variant="contained" size={"small"}>update every 5sec <Checkbox defaultChecked
                                                                               color="secondary"/></Button>

    </div>
})
