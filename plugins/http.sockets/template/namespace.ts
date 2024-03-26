import broadcastNamespace from "./broadcastNamespace";
import { $io } from "./setupNotificationService";

export default class Namespace {
    name: string;

    events: { name: string, event: Function }[] = [];

    constructor (name: string) {
        this.name = name;

        $io.of(name).on("connection", (socket) => {
            this.events.forEach((event: any) => {
                socket.on(event.name, event.event);
            });
        });
    }

    broadcast (event: string, data: any) {
        broadcastNamespace(this.name, event, data);
    }

    on (event: string, callback: Function) {
        this.events.push({ name: event, event: callback });
    }
}