import { Routes, Route, Navigate } from "react-router";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Homepage from "./pages/Homepage";
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from "./authSlice";
import { useEffect } from "react";

// Helper to get a cookie by name
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    // Only check auth if we actually have a token
    const token = getCookie('token');
    if (token) {
      dispatch(checkAuth());
    }
    // If no token, we stay unauthenticated; no request is sent => no 401
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Homepage /> : <Navigate to="/signup" />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <Signup />} />
      </Routes>
    </>
  );
}

export default App;