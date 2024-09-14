import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { sendErrorResponse,  sendSuccessResponse } from "../src/utils/api-response";

import Entity  from "../src/models/entities";
import User  from "../src/models/users";


const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  try {
    const allentities = await Entity.findAll({
      include: [
        {
          model: User,
          as: 'accountManager',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: User,
          as: 'pointContact',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });
    sendSuccessResponse(context, allentities);
  } catch (e) {
    sendErrorResponse(e, context);
  }
  
};

export default httpTrigger;


