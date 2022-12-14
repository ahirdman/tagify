interface ImportMetaEnv {
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  readonly VITE_FIREBASE_BUCKET: string;
  readonly VITE_FIREBASE_MESSAGING: string;
  readonly VITE_FIREBASE_APP_ID: string;
  readonly VITE_FIREBASE_MEASURMENT_ID: string;
  readonly VITE_LOCAL_SERVER: string;
  readonly VITE_CLOUD_SERVER: string;
  readonly VITE_SDKURL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
