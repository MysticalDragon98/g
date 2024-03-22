export default interface IJSONRPCRequest {
    jsonrpc: string;
    method: string;
    params?: any[] | object;
    id: string | number | null;
}