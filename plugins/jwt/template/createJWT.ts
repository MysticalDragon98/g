import { sign, SignOptions } from "jsonwebtoken";
import { $JWT_SECRET } from "../../lib/env";

type JWTOptions = SignOptions & { secret?: string; }

export async function createJWT<T extends string | Buffer | object> (payload: T, options: JWTOptions = {}) {
    return sign(payload, options.secret ?? $JWT_SECRET, options);
}