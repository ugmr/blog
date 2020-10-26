import axios from 'axios'
import {getToken} from '../utils/token'
import config from '../config'

const http = axios.create({
    baseURL: config.axiosURL,
    timeout: 1000,
    headers: {'Authorization': getToken()}
})

export default http