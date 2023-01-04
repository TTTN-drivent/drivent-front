import api from './api';

export async function getDates(token) {
  const response = await api.get('/activity/dates', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export async function getActivities(id, token) {
  const response = await api.get(`/activity/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
