import { Schema, model, Document, Model, Connection } from 'mongoose';
import { mapToMongoDoc, mapToMongoDocs } from '../../utils/mongoUtils';
import { Cache, CacheDao } from './CacheDao';

export const DOCUMENT_NAME = 'cache';

const schema = new Schema(
    {
        key: String,
        value: String,
        ttl: Date,
        last_modified: Date,
    },
    {
        timestamps: false,
        versionKey: false,
    },
);

export class CacheDaoMongo implements CacheDao {

    model: Model<Document<Cache>>;

    constructor(mongo: Connection) {
        this.model = mongo.model<Document<Cache>>(DOCUMENT_NAME, schema);
    }

    exists(key: string) {
        return this.model.exists({key}).then((value) => {
            return value;
        })
    }

    getAll(): Promise<Cache[]> {
       return this.model.find({})
       .sort({last_modified: 1})
       .then((response) => {
           return mapToMongoDocs(response);
       })
    }

    getByKey(key: string): Promise<Cache> {
        return this.model.findOne({key})
        .then((response) => {
            if (!response) throw new Error("key: " + key + " not found")
            return mapToMongoDoc(response);
        })
    }

    deleteAll(): Promise<void> {
        return this.model.deleteMany({}).then(() => {
            return;
        })
    }

    deleteByKey(key: string): Promise<void> {
       return this.model.deleteOne({key}).then(() => {
           return;
       })
    }

    set(cache: Cache): Promise<void> {
        return this.model.findOneAndUpdate({ key: cache.key }, {
            '$set': cache,
        }, { upsert: true, }).then((r) => {
            return;
        })
    }

}

export const CacheModel = model<Cache>(DOCUMENT_NAME, schema);
