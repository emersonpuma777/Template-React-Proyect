import appointmentParser from "@infrastructure/models/appointement";
import ApiHandler from "@utils/ApiHandler";
import createResponseParser from "@utils/createResponseParser";

async function search() {
  const res = await ApiHandler.get(`/appointments`, {});
  return createResponseParser(appointmentParser).parse(res);
}

export default {
  search,
};
