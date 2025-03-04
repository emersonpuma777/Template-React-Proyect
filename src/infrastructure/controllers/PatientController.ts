import patientParser, { PatientParser } from "@infrastructure/models/patient";
import ApiHandler from "@utils/ApiHandler";
import createResponseParser from "@utils/createResponseParser";

async function search() {
  const res = await ApiHandler.get(`/patients`, {});
  return createResponseParser(patientParser).parse(res);
}

function create(data: PatientParser) {
  return ApiHandler.post(`/patients`, { data });
}

function update(id: string, data: PatientParser) {
  return ApiHandler.put(`/patients/${id}`, { data });
}

function remove(id: string) {
  return ApiHandler.delete(`/patients/${id}`, {});
}

export default {
  search,
  create,
  update,
  remove,
};
