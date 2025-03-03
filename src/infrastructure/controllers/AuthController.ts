import signIn from "@infrastructure/models/signIn";
import { User } from "@infrastructure/models/user";
import ApiHandler from "@utils/ApiHandler";

async function login(data: { username: string; password: string }) {
  const res = await ApiHandler.post(`/sign-in`, {
    data,
  });

  return signIn.parse(res);
}

function signup(data: User) {
  return ApiHandler.post(`/signup`, {
    data,
  });
}

export default {
  login,
  signup,
};
