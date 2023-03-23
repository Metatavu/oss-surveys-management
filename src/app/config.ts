import { cleanEnv, url } from "envalid";

type Config = {
  api: {
    baseUrl: string;
  }
};

const env = cleanEnv(import.meta.env, {
  VITE_API_BASE_URL: url()
});

const config: Config = {
  api: {
    baseUrl: env.VITE_API_BASE_URL
  }
};

export default config;