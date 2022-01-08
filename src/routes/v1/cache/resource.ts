import { Router } from "express";
import { injectService } from "../../../middlewares/serviceMidleware";
import { addToCache, deleteAllCache, deleteCacheByKey, getAllCacheData, getCacheByKey } from "./controller";

const router = Router();

router.get('/all', injectService, getAllCacheData);

router.get('/:cacheKey', injectService, getCacheByKey);

router.delete('/all', injectService, deleteAllCache);

router.delete('/:cacheKey', injectService, deleteCacheByKey);

router.post('/add', injectService, addToCache);

export { router as cacheRoute };
