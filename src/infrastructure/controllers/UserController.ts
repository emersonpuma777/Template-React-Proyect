import ApiHandler from "@utils/ApiHandler";

function change(data: { new_password: string; current_password: string }) {
  return ApiHandler.put(`/users/change-password`, { data });
}

export default {
  change,
};
