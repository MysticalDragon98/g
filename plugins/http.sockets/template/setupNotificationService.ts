import { Express } from 'express';
import { Server } from 'socket.io';
import { log } from "termx";

export let $io: Server;

export default async function setupNotificationService (httpServer: Express) {
    $io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    await import('../../lib/http/sockets/namespaces');
    
    log("Notifications service attached to http server");
}