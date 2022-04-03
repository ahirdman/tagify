const fetchJson = async (path: string, token: string, trackId?: string) => {

  // Second parameter is used for more than just trackId
  const body = {
    token: token,
    trackId: trackId,
  }

  // const results = await fetch(`http://localhost:8080${path}`, {
  const results = await fetch(path, {
    method: 'post',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });

  console.log(results)

  const data = await results.json()
  return data;
}

export default fetchJson;
