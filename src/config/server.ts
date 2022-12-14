export const SERVER =
  window.location.hostname === 'localhost'
    ? import.meta.env.VITE_LOCAL_SERVER
    : import.meta.env.VITE_CLOUD_SERVER;
