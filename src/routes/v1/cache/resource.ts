import { Router } from "express";
import { injectService } from "../../../middlewares/serviceMidleware";
import { addToCache, deleteAllCache, deleteCacheByKey, getAllKeys, getCacheByKey } from "./controller";

const router = Router();

router.get('/all', injectService, getAllKeys);

router.get('/:cacheKey', injectService, getCacheByKey);

router.delete('/all', injectService, deleteAllCache);

router.delete('/:cacheKey', injectService, deleteCacheByKey);

router.post('/add', injectService, addToCache);

export { router as cacheRoute };
