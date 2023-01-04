import api from './api';

export async function getDates(token) {
  const response = await api.get('/activity/dates', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
