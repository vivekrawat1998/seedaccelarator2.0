import axios from 'axios';

const API_URL = 'http://localhost:1337/api/breeder-requests';

// export const breederService = {
//     createBreederRequest: async (formData) => {
//         const response = await axios.post(API_URL, { data: formData });
//         return response.data;
//     },
//     getBreederRequests: async () => {
//         const response = await axios.get(API_URL);
//         return response.data;
//     }
// };


import api from '../../api/axios';  // ← Uses interceptor with token
export const breederService = {
    createBreederRequest: (data) => api.post('/breeder-requests', { data })  // ← Correct Strapi format
};


// export const breederService = {

//     createBreederRequest: async (data) => {

//         const token = JSON.parse(localStorage.getItem("auth"))?.jwt;

//         return axios.post(
//             "/breeder-requests",
//             {
//                 data: data   // ⭐ REQUIRED BY STRAPI
//             },
//             {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             }
//         );
//     }

// };