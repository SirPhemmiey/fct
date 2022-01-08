import { addMinutes, generateRandomString } from "../../utils";
import { CacheDao, Cache } from "./CacheDao";

enum CacheType {
    CacheHit = 'CacheHit',
    CacheMiss = 'CacheMiss'
}

interface CacheResponse {
    cacheType: CacheType,
    key: string,
    value: string
}

const TTL = parseInt(<string>process.env.TTL, 10) || 86400000;
const now = new Date();



export class CacheService {

    constructor(private readonly cacheDao: CacheDao, private readonly cacheCapacity: number) { }

    async getAll(): Promise<Cache[]> {
        return this.cacheDao.getAll();
    }

    async getByKey(key: string): Promise<CacheResponse> {
        const keyExists = await this.cacheDao.exists(key);
        let response: CacheResponse = { cacheType: CacheType.CacheMiss, key: key, value: '', };
        const generatedValue = generateRandomString();
        if (!keyExists) {
            //cache miss
            await this.set({ key: key, value: generatedValue, ttl: addMinutes(now, 2), last_modified: now });
            response.value = generatedValue;
            return response;
        }

        //cache hit
        const cache = await this.cacheDao.getByKey(key);
        response.cacheType = CacheType.CacheHit;

        // If current time is greater than the TTL of the key, generate a new value
        if (now.getTime() > cache.ttl.getTime()) {
            await this.set({ key, value: generatedValue, ttl: addMinutes(now, 2), last_modified: now });
            response.value = generatedValue;
        } else {
            await this.set({ key, last_modified: now, ttl: addMinutes(now, 2) });
            response.value = cache.value;
        }
        return response;
    }

    async deleteAll(): Promise<void> {
        return this.cacheDao.deleteAll();
    }

    async deleteByKey(key: string): Promise<void> {
        return this.cacheDao.deleteByKey(key);
    }

    async set(cache: Partial<Cache>): Promise<void> {
        const allCache = await this.getAll();
        /**
         * This approach is known as the LRU Cache method/approach
         * If the cache size/length is equal or greater than allowed capacity (at class instantiation)
         * We're getting least used key by  sorting the last_modified date in ascending order (1)
         * And then we're deleting it and replacing it with the new key
         * This way, we won't exceed our cache limit/capacity at all
         */
        if (allCache && allCache.length >= this.cacheCapacity) {
            await this.deleteByKey(allCache[0].key);
            await this.set({ key: cache.key, last_modified: now, ttl: addMinutes(now, 2) })
        }
        return this.cacheDao.set(cache);
    }

}