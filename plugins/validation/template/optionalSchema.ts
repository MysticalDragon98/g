export default function optionalSchema (schema: any, required?: string[]) {
    return {
        ...schema,
        required: required ?? []
    }
}