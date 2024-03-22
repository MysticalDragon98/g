
import { Mongoose, connect } from "mongoose";
import { $MONGO_URI } from "../../lib/env";
import { createModuleInspector } from "@olptools/inspector";

const inspector = createModuleInspector("MONGO");

export let MongoConnection: Mongoose = null;
export async function initDatabaseConnection () {
    MongoConnection = await connect($MONGO_URI);

    inspector.method("connect").log({ type: "success" });
}