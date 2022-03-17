import { properties } from '../config';

const fetchJson = async (path, token, trackId) => {

  // Second parameter is used for more than just trackId
  const body = {
    token: token,
    trackId: trackId,
  }

  const results = await fetch(`${properties.host}${path}`, {
    method: 'post',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });

  const data = await results.json()
  return data;
}

export default fetchJson;
