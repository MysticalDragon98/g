import IJSONRPCError from "./JSONRPCError.interface";

export default interface IJSONRPCResponse {
    jsonrpc: string;
    result?: any;
    error?: IJSONRPCError;
    stream?: boolean;
    id: string | number | null;
}