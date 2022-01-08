import { Response, Request, Router } from 'express';
import { ServiceContainer } from '../../../di-container';
import { ResponseFormat } from '../../../core/ResponseFormat';
import { messages } from '../../../utils/constants';
import { Cache } from '../../../services/CacheService/CacheDao';
import statusCode from 'http-status-codes';
import Boom from 'boom';

const response = new ResponseFormat();

export const getAllCacheData = (req: Request, res: Response) => {
    const base = (req as any).service as ServiceContainer;
    return base.cacheService.getAll().then((cacheData) => {
        response.handleSuccess(res, {
            status: messages.SUCCESS,
            statusCode: statusCode.OK,
            data: cacheData,
        });
    }).catch((err) => {
        console.error(err.message);
        const { output } = Boom.badRequest(err.message);
        return response.handleError(res, output);
    });
};

export const getCacheByKey = (req: Request, res: Response) => {
    const base = (req as any).service as ServiceContainer;
    return base.cacheService.getByKey(req.params.cacheKey).then((cacheResponse) => {
        response.handleSuccess(res, {
            status: messages.SUCCESS,
            statusCode: statusCode.OK,
            data: cacheResponse,
        });
    })
    .catch((err) => {
        console.error(err.message);
        const { output } = Boom.badRequest(err.message);
        return response.handleError(res, output);
    });
};

export const deleteAllCache = (req: Request, res: Response) => {
    const base = (req as any).service as ServiceContainer;
    return base.cacheService.deleteAll().then(() => {
        response.handleSuccess(res, {
            status: messages.SUCCESS,
            statusCode: statusCode.OK,
            data: {
                message: 'All Cache Data Successfully Deleted',
            }
        });
    }).catch((err) => {
        console.error(err.message);
        const { output } = Boom.badRequest(err.message);
        return response.handleError(res, output);
    });
};

export const deleteCacheByKey = (req: Request, res: Response) => {
    const base = (req as any).service as ServiceContainer;
    return base.cacheService.deleteByKey(req.params.cacheKey).then(() => {
        response.handleSuccess(res, {
            status: messages.SUCCESS,
            statusCode: statusCode.OK,
            data: {
                message: 'Cache Key Successfully Deleted',
            }
        });
    }).catch((err) => {
        console.error(err.message);
        const { output } = Boom.badRequest(err.message);
        return response.handleError(res, output);
    });
};

export const addToCache = (req: Request, res: Response) => {
    const base = (req as any).service as ServiceContainer;
    const doc = req.body as Cache;
    return base.cacheService.set(doc).then(() => {
        response.handleSuccess(res, {
            status: messages.SUCCESS,
            statusCode: statusCode.OK,
            data: {
                message: 'New Cache Successfully Added',
            }
        });
    }).catch((err) => {
        console.error(err.message);
        const { output } = Boom.badRequest(err.message);
        return response.handleError(res, output);
    });
};