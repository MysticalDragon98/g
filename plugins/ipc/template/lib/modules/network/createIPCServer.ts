import { IPCServer } from "../../classes/IPCServer.class";

export default function createIPCServer<T> (sock: string, endpoints: T) {
    return new IPCServer(sock, endpoints);
}