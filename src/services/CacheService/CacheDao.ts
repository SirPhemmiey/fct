// import { Document } from 'mongoose';


export interface Cache {
    key: string;
    value: string,
    ttl: Date,
    last_modified: Date,
}


export interface CacheDao {
    getAll(): Promise<Cache[]>;
    getByKey(key: string): Promise<Cache>;
    deleteAll(): Promise<void>;
    deleteByKey(key: string): Promise<void>;
    set(cache: Partial<Cache>): Promise<void>;
    exists(key: string): Promise<boolean>
    //getKeyByDate(): Promise<Cache[]>
}