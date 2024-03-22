export default interface IJSONRPCError {
    code: number;
    message: string;
    data?: any;
}