import { useState } from "react";
import API from "../../http-call/apiCall";
import { useNavigate } from "react-router-dom";

export const LoginApi = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await API.post(
        "/api/account/login",
        { identifier, password },
        { withCredentials: true }
      );

      //   const data = await response.data;

      if (response.status === 200) {
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
