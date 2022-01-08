
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

/**
 * this is going to be the base service where every other service or service container will inherit from
 * Things that can be put in the service here are configurable timezones, configurable currencies and other basic
 * configurations or settings that can be configurable and common to all "services/environments" etc
 */
export interface Service {
    //environment: ENV,
}

export interface ServiceContainer extends Service {
    cacheService: CacheService,
    cacheDao: CacheDao,
}

const createContainer = () => {
    const cacheDao = new CacheDaoMongo(getMongo());
    const cacheService = new CacheService(cacheDao, CACHE_CAPACITY);

    const container: ServiceContainer = {
        cacheDao,
        cacheService,
    }
    return container;
};

// const developmentBaseService: Service = {
//     environment: ENV.Development
// }; 

// const stagingBaseService: Service = {
//     environment: ENV.Staging
// }; 

// const productionBaseService: Service = {
//     environment: ENV.Production
// };  

// const developmentService = createContainer(developmentBaseService);
// const stagingService = createContainer(stagingBaseService);
// const productionService = createContainer(productionBaseService);
const service = createContainer();

//to use the service container anywhere else out of context (using the this keyword)
export const getService = () => {
    return service;
};
