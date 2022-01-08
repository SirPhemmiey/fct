
/**
 *
 * Manual dependency injection was used here, but a dependency injection library like typedi could be used as normal practice
 */

import { getMongo } from "./clients/mongodb/mongo";
import { ENV, getEnv } from "./env";
import { CacheDao } from "./services/CacheService/CacheDao";
import { CacheDaoMongo } from "./services/CacheService/CacheDaoMongo";
import { CacheService } from "./services/CacheService/CacheService";

const CACHE_CAPACITY = getEnv().CACHE_CAPACITY;

//this is going to be the base service where every other service or service container will inherit from
/**
 * Thing that can be put in the service here are configurable timezones, configurable currency etc
 */
export interface Service {
    environment: ENV,
}

export interface ServiceContainer extends Service {
    cacheService: CacheService,
    cacheDao: CacheDao,
}


// const service: ServiceContainer = {
//     cacheDao,
//     cacheService,
// };

const createContainer = (baseService: Service) => {
    const cacheDao = new CacheDaoMongo(getMongo(baseService.environment));
    const cacheService = new CacheService(cacheDao, CACHE_CAPACITY);
};

const developmentBaseService: Service = {
    environment: ENV.Development
}; 

const stagingBaseService: Service = {
    environment: ENV.Staging
}; 

const productionBaseService: Service = {
    environment: ENV.Production
};  

//to use this service container anywhere else out of context
export const getService = (env: ENV) => {
    if (env === ENV.Development) {
        return developmentBaseService;
    } else if (env === ENV.Staging) {
        return stagingBaseService;
    } else if (env === ENV.Production) {
        return productionBaseService;
    }
    throw new Error("unknown env: " + env);
};
