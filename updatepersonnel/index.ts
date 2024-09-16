import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { sendErrorResponse,  sendSuccessResponse } from "../src/utils/api-response";
import Personnel  from "../src/models/personnel";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  try {
    const { id } = req.params;
    const {
      first_name,
      last_name,
      role,
      entity,
      email,
      country,
      phone,
      phone_code,
      department,
    } = req.body;

    const updatedPersonnel = await Personnel.update(
      {
        first_name,
        last_name,
        role,
        entity,
        email,
        phone,
        phone_code,
        department,
        country,
      },
      { where: { id } }
    );

    sendSuccessResponse(context, updatedPersonnel);
  } catch (e) {
    sendErrorResponse(e, context);
  }
  
};

export default httpTrigger;

