import axios from 'axios';

const getApiBaseUrl = () => {
  return '/api';
};

const api = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

export const experiencesAPI = {
  getAll: async () => {
    const response = await api.get('/experiences');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/experiences/${id}`);
    return response.data;
  },
};

export const bookingsAPI = {
  create: async (bookingData) => {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  },
};

export const promoAPI = {
  validate: async (code, amount) => {
    const response = await api.post('/promo/validate', { code, amount });
    return response.data;
  },
};

export default api;
