import api from './api';

export async function getTicket(token) {
  const response = await api.get('/tickets', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export async function saveTicket(body, token) {
  const response = await api.post('/tickets', body, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export async function getTicketType(token) {
  const response = await api.get('/tickets/types', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export async function getTicketTypeByName(name, token) {
  const response = await api.get(`/tickets/types/${name}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
