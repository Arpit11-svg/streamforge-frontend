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
      if(response.statusCode === 200) {
        dispatch(logout());
        navigate("/login");
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <button
      className=" bg-red-600 text-white inline-bock px-6 py-2 duration-200 hover:bg-red-700 rounded-full cursor-pointer"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default Logout;
