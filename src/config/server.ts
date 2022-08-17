export const SERVER =
  window.location.hostname === 'localhost'
    ? process.env.REACT_APP_LOCAL_SERVER
    : process.env.REACT_APP_CLOUD_SERVER;
