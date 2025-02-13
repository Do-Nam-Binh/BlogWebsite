import { useState } from "react";
import API from "../../http-call/apiCall";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../state/auth/authSlice";

export const LoginApi = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await API.post(
        "/api/account/login",
        { email: identifier, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        dispatch(
          loginSuccess({
            user: response.data.user,
            accessToken: response.data.accessToken,
          })
        );
        navigate("/");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setError("Login failed");
    }
  };

  return {
    identifier,
    setIdentifier,
    password,
    setPassword,
    error,
    handleSubmit,
  };
};
