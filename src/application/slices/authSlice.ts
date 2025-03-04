import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  created_at?: string | null;
  email?: string | null;
  external_id?: string | null;
  id?: string | null;
  lastname?: string | null;
  name?: string | null;
  password?: string | null;
  username?: string | null;
  role?: string | null;
}

interface AuthState {
  token?: string | null;
  user: UserState | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthState>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: () => initialState,
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
