import Ajv from "ajv"

//* Imports
const ajv = new Ajv();
const schemas = new Map<string, any>()
export default function validate (schema: any, data: any) {
    if (!schemas.has(schema)) {
        schemas.set(schema, ajv.compile(schema))
    }

    const validate = schemas.get(schema)
    const result = validate(data);

    if (!result) {
        throw new Error(validate.errors.map((error: any) => `${error.instancePath} ${error.message}`).join(", "));
    }

    return result;
}