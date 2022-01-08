import express from 'express';

export interface successResponse {
    status: string;
    statusCode: number,
    data: any,
}
export class ResponseFormat {

    constructor() { }

    handleSuccess(res: express.Response, obj: successResponse) {
        const {
            status,
            statusCode,
            data,
        } = obj;
        return res.status(statusCode).json({
            statusCode,
            status,
            data,
        });
    }

    handleError(res: express.Response, obj: any) {
        res.status(obj.statusCode).json(obj);
    }

    handleErrorCustom(obj: any) {
        const res = express.response;
        res.status(obj.statusCode).json(obj);
    }
}