import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { sendErrorResponse,  sendSuccessResponse } from "../src/utils/api-response";
import Personnel  from "../src/models/personnel";


const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  try {
    const { id } = req.params;
    await Personnel.destroy({ where: { id } });

    sendSuccessResponse(context, []);
  } catch (e) {
    sendErrorResponse(e, context);
  }
  
};

export default httpTrigger;

