export type Weather = {
    clouds: {
        all: number;
    };
    coord: {
        lon: number;
        lat: number;
    };
    dt: number;
    id: number;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    name: string;
    sys: {
        type: number;
        id: number;
        country: string;
        sunrise: number;
        sunset: number;
    };
    wind: {
        speed: number;
        deg: number;
        gust: number;
    };
}


export type CityType = {
    name: string,
    id: number,
    country: string,
    temp: number,
    humidity: number,
    press: number,
    speed: number
    time: string
}
