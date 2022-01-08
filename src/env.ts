
import * as dotenv from 'dotenv';

dotenv.config();

export enum ENV {
  Development = 'development',
  Production = 'production',
  Staging = 'staging',
}

export interface SetUpEnv {
  PORT: string,
  NODE_ENV: string,
  CACHE_CAPACITY: number
  MONGO: {
    [e in ENV]: {
      uri: string,
    }
  },
}

export const getEnv = (): SetUpEnv => {
  return {
    PORT: process.env.PORT ?? '11700',
    MONGO: {
      [ENV.Development]: { uri: process.env.MONGO_DEV_URI ?? 'mongodb://localhost:27017/fashion-cloud-dev' },
      [ENV.Production]: { uri: process.env.MONGO_DEV_URI ?? 'mongodb://localhost:27017/fashion-cloud-prod' },
      [ENV.Staging]: { uri: process.env.MONGO_DEV_URI ?? 'mongodb://localhost:27017/fashion-cloud-staging' }
    },
    NODE_ENV: process.env.NODE_ENV ?? 'development',
    CACHE_CAPACITY: Number(process.env.CACHE_CAPACITY || 5)
  }
}