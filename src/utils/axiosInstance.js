

import axios from 'axios';

const axiosInstance = axios.create({
    baseURL:"https://gmail-clone-backend-pfid.onrender.com"
})

export default axiosInstance;