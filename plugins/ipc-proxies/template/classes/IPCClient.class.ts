import { randomUUID } from "crypto";
import { createConnection } from "net";
import IJSONRPCRequest from "../interfaces/JSONRPCRequest.interface";
import IJSONRPCResponse from "../interfaces/JSONRPCResponse.interface";
import { Readable } from "stream";

export class IPCClient {

    socketFile: string;
    streams: Record<string, Readable> = {};
    
    constructor (socketFile: string) {
        this.socketFile = socketFile;
    }

    async request<RQ, RS> (method: string, payload: RQ): Promise<RS> {
        const sock = createConnection(this.socketFile);
        const id = randomUUID();

        const request: IJSONRPCRequest = {
            jsonrpc: "2.0",
            id,
            method,
            params: [payload]
        };

        sock.write(JSON.stringify(request));
        
        return new Promise((resolve, reject) => {
            sock.on("data", (data: Buffer) => {
                const response: IJSONRPCResponse = JSON.parse(data.toString());

                if (response.id === id) {
                    if (response.error) {
                        reject(new Error(response.error.message));
                    } else if (!response.stream) {
                        resolve(response.result);
                    } else {
                        const stream = this.stream(id) ?? this.createStream(id);

                        if (response.result.type === "data") {
                            stream.push(Buffer.from(response.result.data, "base64"));
                        } else if (response.result.type === "end") {
                            stream.push(null);
                            this.endStream(id);
                        }
                    }
                }
            });

            sock.on("error", reject);
        });
    }

    stream (id: string) {
        return this.streams[id];
    }

    endStream (id: string) {
        this.streams[id].destroy();
        delete this.streams[id];
    }

    createStream (id: string) {
        const stream = new Readable();
        this.streams[id] = stream;
        return stream;
    }

}