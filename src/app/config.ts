import { cleanEnv, str, url } from "envalid";

type Config = {
  auth: {
    url: string;
    realm: string;
    clientId: string;
  };
  api: {
    baseUrl: string;
  };
  imageBaseUrl: string;
};

const env = cleanEnv(import.meta.env, {
  VITE_KEYCLOAK_URL: url(),
  VITE_KEYCLOAK_REALM: str(),
  VITE_KEYCLOAK_CLIENT_ID: str(),
  VITE_API_BASE_URL: url(),
  VITE_IMAGE_BASE_URL: url()
});

const config: Config = {
  auth: {
    url: env.VITE_KEYCLOAK_URL,
    realm: env.VITE_KEYCLOAK_REALM,
    clientId: env.VITE_KEYCLOAK_CLIENT_ID
  },
  api: {
    baseUrl: env.VITE_API_BASE_URL
  },
  imageBaseUrl: env.VITE_IMAGE_BASE_URL
};

export default config;
