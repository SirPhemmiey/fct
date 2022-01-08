import { Router } from "express";
import { addToCache, deleteAllCache, deleteCacheByKey, getAllCacheData, getCacheByKey } from "./controller";

const router = Router();

router.get('/all', getAllCacheData);

router.get('/:cacheKey', getCacheByKey);

router.delete('/all', deleteAllCache);

router.delete('/:cacheKey', deleteCacheByKey);

router.post('/add', addToCache);

export { router as cacheRoute }
