import mongoose from "mongoose";
import bluebird from "bluebird";
import { getEnv } from "../../env";

(<any>mongoose).Promise = bluebird;

//https://mongoosejs.com/docs/migrating_to_6.html#no-more-deprecation-warning-options

const createConnection = (uri: string) => {
    const conn = mongoose.createConnection(uri);
    conn.on('error', console.error.bind(console, 'mongo connection error:'));
    conn.once('open', function callback() {
        return;
    });
    return conn;
}

export const getMongo = (): mongoose.Connection => {
    return createConnection(getEnv().MONGO_URI);
}
