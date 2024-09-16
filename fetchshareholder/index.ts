import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { sendErrorResponse,  sendSuccessResponse } from "../src/utils/api-response";

import Entity  from "../src/models/entities";
import User  from "../src/models/users";
import Shareholders  from "../src/models/shareholders";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  try {
    const condition = {} as { type?: string };
    if (req.query.type) {
      condition.type = req.query.type as string;
    }
    const allholders = await Shareholders.findAll({
      where: condition,
      include: [
        {
          model: User,
          as: 'createdBy',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Entity,
          as: 'entityData',
          attributes: ['id', 'name'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    sendSuccessResponse(context, allholders);
  } catch (e) {
    sendErrorResponse(e, context);
  }
  
};

export default httpTrigger;

