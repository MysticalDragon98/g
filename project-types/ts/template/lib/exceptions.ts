import { ok } from "assert";

function parseTextTemplate (text: string, variables: any) {
    // Replace all {variable} with variable
    return text.replace(/\{([^\}]+)\}/g, (match, variable) => {
        return variables[variable] ?? match;
    });
}


export class CustomError extends Error {
    code: string;
    
    constructor(message, code) {
        super(message); // Call the parent constructor with the message parameter
        this.code = code; // Add a custom code property
        this.name = this.constructor.name; // Set the error name to the class name (optional but recommended)
        (<any>Error).captureStackTrace(this, this.constructor); // Capture the correct stack trace (optional but recommended)
    }
}

export const $assert = (expression: any, error: { [key: string]: string }, data?: string | object) => { 
    const code = Object.keys(error)[0];
    const message = parseTextTemplate(error[code], data ?? {});

    if (typeof expression === "function") {
        try {
            return expression();
        } catch (e) {
            throw new CustomError(message, code)
        }
    }
    
    ok(expression, new CustomError(message, code));

    return expression;
}