import { Server } from "@olptools/http-server";
import { $HTTP_PORT } from "../../lib/env";
//* Imports

export const Endpoints = {
    //* Endpoints
}

export async function initHTTPServer () {
    const server = new Server({
        endpoints: Endpoints,
        port: $HTTP_PORT
    });

    //* Plugins
    await server.listen();
}