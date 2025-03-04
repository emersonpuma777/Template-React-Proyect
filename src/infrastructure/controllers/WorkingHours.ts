import ApiHandler from "@utils/ApiHandler";
import createResponseParser from "@utils/createResponseParser";
import { z } from "zod";

async function search(params: { doctor_id: string; date: string }) {
  const res = await ApiHandler.get(`/working-hours`, { params });
  return createResponseParser(z.string()).parse(res);
}

export default {
  search,
};
