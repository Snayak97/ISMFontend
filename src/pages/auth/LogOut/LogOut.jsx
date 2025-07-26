import React from "react";

import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const LogOut = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await logout();
    navigate("/signin", { state: { message: result.message } });
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full py-2 rounded-md text-white bg-red-600 hover:bg-red-700"
    >
      Sign out
    </button>
  );
};

export default LogOut;
