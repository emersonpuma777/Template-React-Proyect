import specialtyParser, {
  SpecialtyParser,
} from "@infrastructure/models/specialty";
import ApiHandler from "@utils/ApiHandler";
import createResponseParser from "@utils/createResponseParser";

async function search() {
  const res = await ApiHandler.get(`/specialties`, {});
  return createResponseParser(specialtyParser).parse(res);
}
function create(data: SpecialtyParser) {
  return ApiHandler.post(`/specialties`, { data });
}

function update(id: string, data: SpecialtyParser) {
  return ApiHandler.put(`/specialties/${id}`, { data });
}

function remove(id: string) {
  return ApiHandler.delete(`/specialties/${id}`, {});
}
export default {
  search,
  create,
  update,
  remove,
};
