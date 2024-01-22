import { ok } from "assert";
export const $ok = (expression: any, message: string) => {
    ok(expression, new Error(message));

    return expression;
}