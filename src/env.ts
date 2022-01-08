
import * as dotenv from 'dotenv';

dotenv.config({path: `.env.${process.env.NODE_ENV}`, debug: true});
//require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })
console.log(`currently using ${process.env.NODE_ENV} env`);


export enum ENV {
  Development = 'development',
  Production = 'production',
  Staging = 'staging',
}

export interface SetUpEnv {
  PORT: string,
  NODE_ENV: string,
  CACHE_CAPACITY: number
  MONGO_URI: string,
}

export const getEnv = (): SetUpEnv => {
  return {
    PORT: process.env.PORT ?? '',
    MONGO_URI: process.env.MONGO_URI ?? '',
    NODE_ENV: process.env.NODE_ENV ?? '',
    CACHE_CAPACITY: Number(process.env.CACHE_CAPACITY || 5)
  }
}