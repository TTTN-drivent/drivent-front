import api from './api';

export async function getDates(token) {
  const response = await api.get('/activities/dates', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export async function getActivities(id, token) {
  const response = await api.get(`/activities/dates/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export async function saveActivity(body, token) {
  const response = await api.post('/activities', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getActivityRegister(id, token) {
  const response = await api.get(`/activities/registers/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getLocals(token) {
  const response = await api.get('/activities/locals', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
//
