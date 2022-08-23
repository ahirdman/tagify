import { SERVER } from '../../config/server';

export const get = async (path: string) => {
  const query = await fetch(`${SERVER}${path}`);
  const json = await query.json();
  return json;
};

export const postWithCookie = async (path: string, body: any) => {
  const query = await fetch(`${SERVER}${path}`, {
    method: 'POST',
    body: JSON.stringify(body),
    credentials: 'include',
  });
  const json = await query.json();
  return json;
};

export const post = async (path: string, body: any) => {
  const query = await fetch(`${SERVER}${path}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  const json = await query.json();
  return json;
};

export const del = (path: string, body: any) => {
  fetch(`${SERVER}${path}`, {
    method: 'DELETE',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
};
