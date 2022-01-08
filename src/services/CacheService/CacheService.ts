// import { addMinutes } from "date-fns";
import { addMinutes, generateRandomString } from "../../utils";
import { CacheDao, Cache } from "./CacheDao";

export enum CacheType {
    CacheHit = 'CacheHit',
    CacheMiss = 'CacheMiss'
}

interface CacheResponse {
    cacheType: CacheType,
    key: string,
    value: string
}

export class CacheService {

    constructor(private readonly cacheDao: CacheDao, private readonly cacheCapacity: number) { }

    async getAllKeys(): Promise<Pick<Cache, 'key'>[]> {
        const keys = await this.cacheDao.getAll();
        return keys.map((k) => {
            return {
                key: k.key
            }
        });
    }

    async getByKey(key: string): Promise<CacheResponse> {
        const now = new Date();
        const keyExists = await this.cacheDao.exists(key);
        let response: CacheResponse = { cacheType: CacheType.CacheMiss, key: key, value: '', };
        const generatedValue = generateRandomString();
        if (!keyExists) {
            //cache miss
            response.value = generatedValue;
            await this.set({ key: key, value: response.value, ttl: addMinutes(now, 2), last_modified: now });
            return response;
        }

        //cache hit
        const cache = await this.cacheDao.getByKey(key);
        response.cacheType = CacheType.CacheHit;

        // If current time is greater than the TTL of the key, generate a new value
        if (now.getTime() > cache.ttl.getTime()) {
            response.value = generatedValue;
            console.info('TTL is elapsed, generate a new value and then refresh TTL');
            await this.set({ key, value: generatedValue, ttl: addMinutes(now, 2), last_modified: now });
        } else {
            console.info('TTL still on time, do not update value and then refresh TTL');
            response.value = cache.value;
            await this.set({ key, ttl: addMinutes(now, 2), last_modified: now });
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
        const now = new Date();
        const allCache = await this.getAllKeys();
        /**
         * This approach is known as the LRU Cache method/approach
         * If the cache size/length is equal or greater than allowed capacity (at class instantiation)
         * We're getting least recently used key by sorting the last_modified date in ascending order (1)
         * And then we're deleting it and replacing it with a new key
         * This way, we won't exceed our cache limit/capacity at all which is an important business requirement in our case
         */
        if (allCache && allCache.length >= this.cacheCapacity) {
            console.info('cache limit reached');
            await this.deleteByKey(allCache[0].key);
            return this.cacheDao.set({ key: cache.key, value: cache.value, last_modified: now, ttl: addMinutes(now, 2) });
        }
        cache.ttl = addMinutes(now, 2);
        cache.last_modified = now;
        await this.cacheDao.set(cache);
        return;
    }

}