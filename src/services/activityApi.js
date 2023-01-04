import api from './api';

export async function saveActivity(body, token) {
  const response = await api.post('/activity', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getActivityRegister(id, token) {
  const response = await api.get(`/activity/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
//
