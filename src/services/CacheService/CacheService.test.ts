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

    it('GET /all', async () => {
       const keys = await cacheService.getAllKeys();
       expect(keys).toBeInstanceOf(Array);
    });


    // it('DELETE /:cacheKey', async() => {
    //     await cacheService.deleteByKey("1");
    // });

    it('GET /:cacheKey', async() => {
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

    it('POST /add', async() => {
        const result = await cacheService.set({
            key: '2',
            value: '2'
        });
    });


});