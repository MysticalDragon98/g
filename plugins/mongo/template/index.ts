
import { Mongoose, connect } from "mongoose";
import { $MONGO_URI } from "../../lib/env";
import { log } from "termx";

export let MongoConnection: Mongoose = null;
export async function initDatabaseConnection () {
    MongoConnection = await connect($MONGO_URI);

    log("MongoDB connection established");
}