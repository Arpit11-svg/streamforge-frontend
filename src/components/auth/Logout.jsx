import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice.js";
import authService from "../../services/auth.service.js";
import { useNavigate } from "react-router-dom";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const response = await authService.logout();
      if (response.statusCode === 200) {
        dispatch(logout());
        navigate("/login");
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <button type="button" onClick={logoutHandler} className="w-full text-left">
      Logout
    </button>
  );
}

export default Logout;
