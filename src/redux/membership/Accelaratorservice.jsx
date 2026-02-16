import axios from 'axios';

const API_URL = 'http://localhost:1337/api/accelartor-requests';

export const accelartorService = {
    // POST a new request
    createRequest: async (formData) => {
        // Strapi expects data to be wrapped in a "data" object
        const response = await axios.post(API_URL, { data: formData });
        return response.data;
    },
    
    // GET all requests
    getAllRequests: async () => {
        const response = await axios.get(API_URL);
        return response.data;
    }
};