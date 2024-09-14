import { State } from 'country-state-city';
import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { sendErrorResponse,  sendSuccessResponse } from "../src/utils/api-response";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  try {
    const country = req.query.country.toUpperCase();
    const states = State.getStatesOfCountry(country).map((x) => ({
      label: x.name,
      value: x.isoCode,
    }));

    sendSuccessResponse(context, states);
  } catch (e) {
    sendErrorResponse(e, context);
  }
};

export default httpTrigger;

