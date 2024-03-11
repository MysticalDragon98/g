import { ClientSession } from "mongoose";
import { dbSession } from "./dbSession";
export default async function withSession (callback: (session?: ClientSession) => any, session?: ClientSession, mandatorySession?: boolean) {
    if (mandatorySession) {
        const _session = await dbSession();
        try {
            const result = await callback(_session);
            await _session.commitTransaction();
            return result;
        } catch (exc) {
            await _session.abortTransaction();
            throw exc;
        }
    } else if (session === undefined) {
        return await callback();
    } else {
        return await callback(session as ClientSession);
    }
}