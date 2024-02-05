import { Server } from "@mysticaldragon/unete";
import { $HTTP_PORT } from "../../lib/env";
//* Imports

const Endpoints = {
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