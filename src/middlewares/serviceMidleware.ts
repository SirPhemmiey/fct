import express from 'express';
import { getService } from '../di-container';

export const injectService: express.RequestHandler = async (req, res, next) => {
    const service = getService();
    (req as any).service = service;
    next();
}