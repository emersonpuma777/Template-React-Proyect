import ApiHandler from "@utils/ApiHandler";

function pay(data: {
  appointment_id: number;
  amount: number;
  payment_method: string;
}) {
  return ApiHandler.post(`/payments`, { data });
}

export default {
  pay,
};
