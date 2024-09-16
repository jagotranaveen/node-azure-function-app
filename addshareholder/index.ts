import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { sendErrorResponse,  sendSuccessResponse } from "../src/utils/api-response";

import ShareHolders  from "../src/models/shareholders";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  try {
    const {
      type,
      first_name,
      last_name,
      legal_name,
      email,
      phone,
      number_of_shares,
      share_percentage,
      entity,
      created_by,
    } = req.body;

    if (!entity) {
      context.res = {
        status: 400,
        body: { status: false, message: 'Entity is requiresd' },
      };
    }

    const newShare = await ShareHolders.create({
      type,
      first_name,
      last_name,
      legal_name,
      email,
      phone,
      number_of_shares,
      share_percentage,
      entity,
      created_by,
    });

    sendSuccessResponse(context, newShare);
  } catch (e) {
    sendErrorResponse(e, context);
  }
  
};

export default httpTrigger;

