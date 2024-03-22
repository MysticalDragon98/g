import { ElasticProxy } from "@mysticaldragon/proxies";
import { IPCClient } from "./classes/IPCClient.class";

export function IPCProxy (sock: string) {
    return ElasticProxy.newRecursive({
        recursive: true,

        async apply (path: string[], args: any[]) {
            if (path.length === 0 || path[0] === "then") {
                return;
            }
            
            const client = new IPCClient(sock);

            return await client.request(path.join("."), args[0]);
        }
    });
}