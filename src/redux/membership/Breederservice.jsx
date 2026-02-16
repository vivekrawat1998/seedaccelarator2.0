import axios from 'axios';

const API_URL = 'http://localhost:1337/api/breeder-requests';

export const breederService = {
    createBreederRequest: async (formData) => {
        const response = await axios.post(API_URL, { data: formData });
        return response.data;
    },
    getBreederRequests: async () => {
        const response = await axios.get(API_URL);
        return response.data;
    }
};