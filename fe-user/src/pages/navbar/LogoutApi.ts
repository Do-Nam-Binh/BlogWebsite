import { useState } from "react";
import API from "../../http-call/apiCall";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../state/auth/authSlice";

export const LogoutApi = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await API.post(
        "/api/account/logout",
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        dispatch(logout());
        navigate("/");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setError("Logout failed");
    }
  };

  return {
    error,
    handleLogout,
  };
};
