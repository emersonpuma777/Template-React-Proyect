import doctorParser, { DoctorParser } from "@infrastructure/models/doctor";
import ApiHandler from "@utils/ApiHandler";
import createResponseParser from "@utils/createResponseParser";

async function search() {
  const res = await ApiHandler.get(`/doctors`, {});
  return createResponseParser(doctorParser).parse(res);
}

function create(data: DoctorParser) {
  return ApiHandler.post(`/doctors`, { data });
}

function update(id: string, data: DoctorParser) {
  return ApiHandler.put(`/doctors/${id}`, { data });
}

function remove(id: string) {
  return ApiHandler.delete(`/doctors/${id}`, {});
}

export default {
  search,
  create,
  update,
  remove,
};
