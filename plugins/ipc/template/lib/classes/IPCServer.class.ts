import { randomUUID } from "crypto";
import { Server, Socket, createServer } from "net";
import IJSONRPCRequest from "../interfaces/JSONRPCRequest.interface";
import IJSONRPCResponse from "../interfaces/JSONRPCResponse.interface";
import { promisify } from "util";
import { unlink } from "fs/promises";
import getFunctionParamNames from "../modules/utils/getFunctionParamNames";
import { createModuleInspector } from "@olptools/inspector";
import isStream from "../modules/utils/isStream";

const inspector = createModuleInspector("IPC");

export class IPCServer<T> {

    sockFile: string;

    connections: { [key: string]: Socket & { id?: string } };
    server: Server;
    endpoints: T;

    constructor (sockFile: string, endpoints: T) {
        this.sockFile = sockFile;
        this.connections = {};
        this.endpoints = endpoints;

        this.server = createServer((sock: Socket) => {
            const id = randomUUID();

            this.connections[id] = sock;
            (<any>sock).id = id;
            
            sock.on("end", () => delete this.connections[id]);
            sock.on("data", (data: Buffer) => this.onData(sock, data))
        })
    }

    getSockId (sock: Socket) {
        return (<any>sock).id as string;
    }

    async listen () {
        await unlink(this.sockFile).catch(() => {});
        await promisify(this.server.listen.bind(this.server))(this.sockFile);

        inspector.method("listen").log({ type: "success", data: this.sockFile });
    }

    onData (sock: Socket, data: Buffer) {
        this.onJSONRequest(sock, data.toString());
    }

    async onJSONRequest (sock: Socket, data: string) {
        const logger = inspector.method("onJSONRequest").process(this.getSockId(sock));
        try {
            const request: IJSONRPCRequest = JSON.parse(data);

            if (typeof request.id !== "string" || typeof request.method !== "string" || !Array.isArray(request.params)) {
                this.writeError(sock, "Invalid JSON-RPC request.");
                return;
            }

            let fn = this.endpoints;
            const args = [];
            const method = request.method.split(".");
            const body = request.params[0];

            logger.log({ type: "request", data: request.method });

            for (const m of method) {
                if (!fn[m]) {
                    this.writeError(sock, "Method not found.", request.id);
                    
                    logger.log({ type: "error", data: "Method not found." });
                    return;
                }

                fn = fn[m];
            }

            if (typeof fn !== "function") {
                this.writeError(sock, "Method not found.", request.id);
                logger.log({ type: "error", data: "Method not found." });
                return;
            }

            const fnParams = getFunctionParamNames(fn);

            for (const param of fnParams) {
                args.push(body[param]);
            }

            try {
                const result = await fn(...args);

                //* If result is a stream
                if (isStream(result)) {
                    this.pipeStream(sock, result, request.id);
                    return;
                }

                this.writeJSON(sock, {
                    jsonrpc: "2.0",
                    result,
                    id: request.id
                });

                logger.log({ type: "success" });
            } catch (e) {
                this.writeError(sock, e.message, request.id);
            }
        } catch (e) {
            this.writeError(sock, "Invalid JSON-RPC request.");
            logger.log({ type: "error", data: "Invalid JSON-RPC request." });
        } finally {
            this.end(sock);
        }
    }

    pipeStream (sock: Socket, stream: NodeJS.ReadableStream, id: string | null | number) {
        stream.on("data", (data: Buffer) => {
            this.writeJSON(sock, {
                jsonrpc: "2.0",
                stream: true,
                result: {
                    type: "data",
                    data: Buffer.from(data).toString("base64")
                },
                id
            });
        });

        stream.on("end", () => {
            this.writeJSON(sock, {
                jsonrpc: "2.0",
                stream: true,
                result: { type: "end" },
                id
            });

            this.end(sock);
        });
    }

    end (sock: Socket) {
        sock.end();
        inspector
            .method("end")
            .process(this.getSockId(sock))
            .log({ type: "success" });
    }

    writeJSON (sock: Socket, response: IJSONRPCResponse) {
        sock.write(Buffer.from(JSON.stringify(response)));
    }

    writeError (sock: Socket, message: string, id: string | null | number = null) {
        this.writeJSON(sock, {
            jsonrpc: "2.0",
            error: {
                code: -32603,
                message,
                data: null
            },
            id
        });
    }

}