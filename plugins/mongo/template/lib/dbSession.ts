import { MongoConnection } from "..";

export async function dbSession () {
    const session = await MongoConnection.startSession();
    await session.startTransaction();
    return session;
}