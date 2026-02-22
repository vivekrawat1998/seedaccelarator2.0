import axios from 'axios';

import api from '../../api/axios';  // ✅ Uses YOUR token interceptor

export const accelartorService = {
    createRequest: (formData) => api.post('/accelartor-requests', { data: formData }),  // ✅ Correct
    getAllRequests: () => api.get('/accelartor-requests'),  // ✅ Correct
};
