import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/layouts/ProtectedRoute";
import Dashboard from "./components/layouts/Dashboard";
import Login from "./presentation/pages/Auth/Login";
import SignUp from "./presentation/pages/Auth/SignUp";
import Template from "@components/layouts/Template";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@application/store/store";
import { useEffect, useState } from "react";
import { login } from "@application/slices/authSlice";
import MyCalendar from "@presentation/pages/MyCalendar";

function App() {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("userInfo");
    const token = sessionStorage.getItem("accessToken");

    if (storedUser) {
      dispatch(
        login({
          isAuthenticated: true,
          user: JSON.parse(storedUser),
          token: token,
        })
      );
    }
    setLoading(false);
  }, [dispatch]);

  if (loading) return <div />;

  return (
    <>
      <Template>
        <Routes>
          <Route
            path="/login"
            element={user ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/dashboard" /> : <SignUp />}
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard>
                  <MyCalendar />
                </Dashboard>
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
          />
        </Routes>
      </Template>
    </>
  );
}

export default App;
