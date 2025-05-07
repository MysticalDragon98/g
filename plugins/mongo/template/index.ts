
import { Mongoose, connect } from "mongoose";
import { $MONGO_URI } from "../../lib/env";
import debug from "debug";
const log = debug("plugin:mongo");

export let MongoConnection: Mongoose = null;
export async function initDatabaseConnection () {
    MongoConnection = await connect($MONGO_URI);

    log("MongoDB connection established");
}