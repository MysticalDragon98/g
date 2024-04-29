import { ElasticProxy } from "@mysticaldragon/proxies";
import Axios from "axios";

interface Options {
    timeout?: number;
    headers?: Record<string, string>;
    resultParser?: (result: any) => any;
    errorParser?: (error: any) => any;
}
export const HTTPProxy = (url: string, options: Options = {}) => 
    ElasticProxy.newRecursive({
        recursive:  true,
        
        async apply (path: string[], args: any[]) {
            let time = Date.now();
            return new Promise (async (resolve, reject) => {
                const reqpath = url + "/" + path.join("/").toLowerCase();
                if (options.timeout) {
                    setTimeout(() => reject(new Error("Request " + reqpath + " timed out")), options.timeout);
                }
                try {
                    const response = await Axios.post(
                        reqpath,
                        args[0],
                        { headers: { Accept: 'application/json', ...(options.headers ?? {})  } }
                    );
                    
                    // logger.debug("Request to " + reqpath + " took " + (Date.now() - time) + "ms");
                    if (options.resultParser) resolve(await options.resultParser(response.data));
                    else resolve(response.data.result);
                } catch (exc: any) {
                    if (options.errorParser) reject("Request " + reqpath + " failed: " + options.errorParser(exc));
                    else if (exc.response && exc.response.data && exc.response.data.error && typeof exc.response.data.error === "string") 
                        reject(new Error("Request " + reqpath + " failed: " + exc.response.data.error));
                    else if (exc.response && exc.response.data && exc.response.data.error)
                        reject(new Error("Request " + reqpath + " failed: " + JSON.stringify(exc.response.data.error)));
                    else if (exc.response && exc.response.data && exc.response.data.message)
                        reject(new Error("Request " + reqpath + " failed: " + exc.response.data.message));
                    else if (exc.response && exc.response.status)
                        reject(new Error("Request " + reqpath + " failed with status code: " + exc.response.status));
                    else
                        reject(new Error("Request " + reqpath + " failed: " + exc.message));
                }
            });
        }

});