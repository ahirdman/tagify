export const SERVER =
  window.location.hostname === 'localhost'
    ? import.meta.env.VITE_LOCAL_SERVER
    : import.meta.env.VITE_CLOUD_SERVER;

export enum APP_ENV {
  DEVELOPMENT = 'DEV',
  TEST = 'TEST',
  PRODUCTION = 'PROD',
}
