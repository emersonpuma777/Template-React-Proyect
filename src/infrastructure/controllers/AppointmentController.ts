import appointmentParser, {
  AppointmentParser,
} from "@infrastructure/models/appointement";
import ApiHandler from "@utils/ApiHandler";
import createResponseParser from "@utils/createResponseParser";

async function search() {
  const res = await ApiHandler.get(`/appointments`, {});
  return createResponseParser(appointmentParser).parse(res);
}

function create(data: AppointmentParser) {
  return ApiHandler.post(`/appointments`, { data });
}

function update(id: string, data: AppointmentParser) {
  return ApiHandler.put(`/appointments/${id}`, { data });
}

function remove(id: string) {
  return ApiHandler.delete(`/appointments/${id}`, {});
}

export default {
  search,
  create,
  update,
  remove,
};
