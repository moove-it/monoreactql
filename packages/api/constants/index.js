import dotenv from 'dotenv';

dotenv.config();

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

const PORT = process.env.GRAPHQL_PORT
  ? parseInt(process.env.GRAPHQL_PORT, 10)
  : 8080;

const { GRAPHQL_PATH, SUBSCRIPTIONS_PATH } = process.env;

const DB = {
  MONGO_URL: process.env.MONGO_URL,
  REDIS_URL: process.env.REDIS_URL,
};

const JWT = {
  SECRET: process.env.JWT_SECRET,
  EXPIRES: process.env.JWT_EXPIRES,
};

const APOLLO = {
  ENGINE: {
    API_KEY: process.env.APOLLO_ENGINE_API_KEY,
    HOSTNAME: process.env.APOLLO_ENGINE_HOSTNAME,
  },
};

export {
  isDev,
  isProd,
  PORT,
  GRAPHQL_PATH,
  SUBSCRIPTIONS_PATH,
  DB,
  JWT,
  APOLLO,
};
