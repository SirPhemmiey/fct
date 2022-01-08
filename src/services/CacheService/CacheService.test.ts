import request from 'supertest';
import { CacheDaoMongo } from './CacheDaoMongo';
import { getMongo } from '.../../../clients/mongodb/mongo';
import { CacheService, CacheType } from './CacheService';

const cacheDao = new CacheDaoMongo(getMongo());
const cacheService = new CacheService(cacheDao, 2);


beforeAll(async () => {
    await cacheService.deleteAll();
});

describe('Cache Service', () => {

    describe('GET /all', () => {
        it('should get all cache keys', async () => {
            const keys = await cacheService.getAllKeys();
            expect(keys).toBeInstanceOf(Array);
        });
    });

    describe('GET /:cacheKey', () => {

        it('should get cache by key', async () => {
            const result = await cacheService.getByKey("1");
            expect(result.key).toBe("1");
            expect(result.value).toBeTruthy();
        });

        it('should determine cache hit and cache miss', async () => {
            //delete all keys
            const deleteAllKeys = await cacheService.deleteAll();
            expect(deleteAllKeys).toBe(true);

            const result = await cacheService.getByKey("1");
            expect(result.key).toBe("1");
            expect(result.value).toBeTruthy();
            expect(result.cacheType).toBe(CacheType.CacheMiss);

            const keys = await cacheService.getAllKeys();
            expect(keys.length).toBe(1);

            const result2 = await cacheService.getByKey("1");
            expect(result2.key).toBe("1");
            expect(result2.value).toBeTruthy();
            expect(result2.cacheType).toBe(CacheType.CacheHit);
        });
    });

    describe('POST /add', () => {
        it('should add/udpate the cache', async () => {
            const addCache = await cacheService.set({
                key: '2',
                value: '2'
            });
            expect(addCache).toBe(true);
        });

        it('should determine the cache size after multiple insertion', async () => {
            //delete all keys
            const deleteAllKeys = await cacheService.deleteAll();
            expect(deleteAllKeys).toBe(true);

            const addCache1 = await cacheService.set({
                key: '3',
                value: '3'
            });
            expect(addCache1).toBe(true);

            const addCache2 = await cacheService.set({
                key: '4',
                value: '4'
            });
            expect(addCache2).toBe(true);

            const addCache3 = await cacheService.set({
                key: '5',
                value: '5'
            });
            expect(addCache3).toBe(true);

            const keys = await cacheService.getAllKeys();
            expect(keys).toBeInstanceOf(Array);
            expect(keys.length).toBe(2); //cache size was 2 at the point of initialization
        });
    });

});