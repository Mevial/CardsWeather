import axios, {AxiosResponse} from 'axios'

const instance = axios.create({
    baseURL: 'https://countriesnow.space/api/v0.1/'
})

// api
export const cityAPI = {
    getAllCity() {
        return instance.get<AxiosResponse>('countries');
    },
};


