import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/layouts/ProtectedRoute";
import Login from "./presentation/pages/Auth/Login";
import SignUp from "./presentation/pages/Auth/SignUp";
import Template from "@components/layouts/Template";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@application/store/store";
import { useEffect, useState } from "react";
import { login } from "@application/slices/authSlice";
import MyCalendar from "@presentation/pages/MyCalendar";
import Doctor from "@presentation/pages/Doctor";
import Appointment from "@presentation/pages/Appointment";
import Patient from "@presentation/pages/Patient";
import { Toaster } from "@components/ui/sonner";
import Account from "@presentation/pages/Account";
import Specialty from "@presentation/pages/Specialty";

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
      <Toaster />
      <Template>
        <Routes>
          <Route
            path="/login"
            element={user ? <Navigate to="/calendar" /> : <Login />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/calendar" /> : <SignUp />}
          />
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/calendar" element={<MyCalendar />} />
            <Route path="/patients" element={<Patient />} />
            <Route path="/doctors" element={<Doctor />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/account" element={<Account />} />
            <Route path="/specialty" element={<Specialty />} />
          </Route>
          <Route
            path="*"
            element={<Navigate to={user ? "/calendar" : "/login"} replace />}
          />
        </Routes>
      </Template>
    </>
  );
}

export default App;
