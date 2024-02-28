import { ClientSession } from "mongoose";
import { dbSession } from "./dbSession";
export default async function withSession (callback: (session: ClientSession) => any, session?: ClientSession) {
    if (session) return await callback(session);
    else {
        const _session = await dbSession();
        try {
            const result = await callback(_session);
            await _session.commitTransaction();
            return result;
        } catch (exc) {
            await _session.abortTransaction();
            throw exc;
        }
    }
}