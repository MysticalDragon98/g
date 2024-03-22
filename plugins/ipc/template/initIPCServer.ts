import { highlight, log } from "termx";
import createIPCServer from "./lib/modules/network/createIPCServer";
//* Imports

const Endpoints = {
    //* Endpoints
};

export async function initIPCServer (socket: string) {
    const server = createIPCServer(socket, Endpoints);

    await server.listen();
}