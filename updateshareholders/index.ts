import { AzureFunction, Context, HttpRequest } from "@azure/functions";

import { sendErrorResponse,  sendSuccessResponse } from "../src/utils/api-response";
import ShareHolders  from "../src/models/shareholders";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  try {
    const { id } = req.params;

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

    const updateholder = await ShareHolders.update(
      {
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
      },
      { where: { id } }
    );

    sendSuccessResponse(context, updateholder);
  } catch (e) {
    sendErrorResponse(e, context);
  }
  
};

export default httpTrigger;

