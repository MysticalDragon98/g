import { ElasticProxy } from "@mysticaldragon/proxies";
import Axios from "axios";
export const HTTPProxy = (url: string, timeout?: number) => 
    ElasticProxy.newRecursive({
        recursive:  true,
        
        async apply (path: string[], args: any[]) {
            let time = Date.now();
            return new Promise (async (resolve, reject) => {
                const reqpath = url + "/" + path.join("/").toLowerCase();
                if (timeout) {
                    setTimeout(() => reject(new Error("Request " + reqpath + " timed out")), timeout);
                }
                try {
                    const response = await Axios.post(
                        reqpath,
                        args[0],
                        { headers: { Accept: 'application/json' } }
                    );
                    
                    // logger.debug("Request to " + reqpath + " took " + (Date.now() - time) + "ms");
                    resolve(response.data.result);
                } catch (exc: any) {
                    if (exc.response && exc.response.data && exc.response.data.error)
                        reject(new Error(exc.response.data.error));
                    else if (exc.response && exc.response.data && exc.response.data.message)
                        reject(new Error(exc.response.data.message));
                    else if (exc.response && exc.response.status)
                        reject(new Error("Request " + reqpath + " failed with status code: " + exc.response.status));
                    else
                        reject(exc);
                }
            });
        }

});