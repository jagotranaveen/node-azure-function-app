import { City } from 'country-state-city';
import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { sendErrorResponse,  sendSuccessResponse } from "../src/utils/api-response";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  try {
    const country = req.query.country.toUpperCase();
    const state = req.query.state.toUpperCase();
    const cities = City.getCitiesOfState(country, state).map((x) => ({
      label: x.name,
      value: x.name,
    }));

    sendSuccessResponse(context, cities);
  } catch (e) {
    sendErrorResponse(e, context);
  }
};

export default httpTrigger;

