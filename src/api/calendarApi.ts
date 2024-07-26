import axios from 'axios'
import { getEnvVariables } from '../helpers'

// @ts-ignore
const { VITE_URL } = getEnvVariables()


const caledarApi = axios.create({
    baseURL: VITE_URL
})

caledarApi.interceptors.request.use((config) => {

    const token = localStorage.getItem('token') || '';
    // @ts-ignore
    config.headers = {
        ...config.headers,
        'x-token': token
    }
    return config
})



export default caledarApi