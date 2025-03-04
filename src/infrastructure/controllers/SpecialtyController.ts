import specialtyParser from "@infrastructure/models/specialty";
import ApiHandler from "@utils/ApiHandler";
import createResponseParser from "@utils/createResponseParser";

async function search() {
  const res = await ApiHandler.get(`/specialties`, {});
  return createResponseParser(specialtyParser).parse(res);
}

export default {
  search,
};
