import mongoose from "mongoose";
import bluebird from "bluebird";
import { ENV, getEnv } from "../../env";

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
let connectionMap: { [e in ENV]: mongoose.Connection };

export const getMongo = (env: ENV): mongoose.Connection => {
    if (!connectionMap) {
        connectionMap = {
            [ENV.Development]: createConnection(getEnv().MONGO[ENV.Development].uri),
            [ENV.Production]: createConnection(getEnv().MONGO[ENV.Production].uri),
            [ENV.Staging]: createConnection(getEnv().MONGO[ENV.Staging].uri),
        };
    }
    if (connectionMap[env]) {
        return connectionMap[env];
    }
    throw new Error("Unknown env: "+env);
}