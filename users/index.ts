import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { userFunction } from "../src";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));
    
    const objResponse = userFunction();
    const responseMessage = "This is users api";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage + objResponse
    };

};

export default httpTrigger;