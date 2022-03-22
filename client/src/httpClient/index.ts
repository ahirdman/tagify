const fetchJson = async (path:string, token:string, trackId:string) => {

  // Second parameter is used for more than just trackId
  const body = {
    token: token,
    trackId: trackId,
  }

  const results = await fetch(path, {
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
