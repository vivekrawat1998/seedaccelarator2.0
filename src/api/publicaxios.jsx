import axios from 'axios';

const publicApi = axios.create({
    baseURL: 'http://localhost:1337/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// NO interceptors - public endpoints only
export default publicApi;
