import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { sendErrorResponse,  sendSuccessResponse } from "../src/utils/api-response";
import Personnel  from "../src/models/personnel";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  try {
    
      const {
        first_name,
        last_name,
        role,
        entity,
        email,
        phone,
        phone_code,
        country,
      } = req.body;
  
      const newPersonnel = await Personnel.create({
        first_name,
        last_name,
        role,
        entity,
        email,
        phone,
        phone_code,
        country,
      });
  
      sendSuccessResponse(context, newPersonnel);
  } catch (e) {
    sendErrorResponse(e, context);
  }
  
};

export default httpTrigger;