import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

interface Film {
    title: string;
}

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

export default function Asynchronous() {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState<readonly Film[]>([]);
    const loading = open && options.length === 0;

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }
        (async () => {
            await sleep(1e3); // For demo purposes.

            if (active) {
                setOptions([...topCity]);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <Autocomplete
            id="asynchronous-demo"
    sx={{ width: 300 }}
    open={open}
    onOpen={() => {
        setOpen(true);
    }}
    onClose={() => {
        setOpen(false);
    }}
    isOptionEqualToValue={(option, value) => option.title === value.title}
    getOptionLabel={(option) => option.title}
    options={options}
    loading={loading}
    renderInput={(params) => (
        <TextField
            {...params}
    label="Asynchronous"
    InputProps={{
    ...params.InputProps,
            endAdornment: (
            <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
        {params.InputProps.endAdornment}
        </React.Fragment>
    ),
    }}
    />
)}
    />
);
}

// Top films as rated by IMDb users. http://www.imdb.com/chart/top
    const topCity = [
        {title: 'Minsk'},
        {title: 'Brest'},
        {title: 'Gomel'},
        {title: 'Grodno'},
        {title: 'Mogilev'},
        {title: 'Vicebsk'},
    ];
