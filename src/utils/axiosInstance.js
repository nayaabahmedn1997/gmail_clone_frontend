

import axios from 'axios';

const axiosInstance = axios.create({
    baseURL:"http://localhost:6002/"
})

export default axiosInstance;