// const fetchJson = async (path: string, token: string, trackId?: string) => {

//   // Second parameter is used for more than just trackId
//   const body = {
//     token: token,
//     trackId: trackId,
//   }

//   const results = await fetch(`http://localhost:8080${path}`, {
//     method: 'post',
//     body: JSON.stringify(body),
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json'
//     }
//   });

//   const data = await results.json()
//   return data;
// }

// export default fetchJson;

const baseUrl = process.env.NODE_ENV === 'production'
  ? ''
  : 'http://localhost:8080';

const get = async (path: string) => {
  const query = await fetch(`${baseUrl}${path}`);
  const json = await query.json();
  return json;
};

const post = async (path: string, body: any) => {
  const query = await fetch(`${baseUrl}${path}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });
  const json = await query.json();
  return json;
};

const del = (path: string, body: any) => {
  fetch(`${baseUrl}${path}`, {
    method: 'DELETE',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
};

export {
  get,
  post,
  del,
};
