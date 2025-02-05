import { useState } from "react";
import API from "../../http-call/apiCall";
import { useNavigate } from "react-router-dom";

export const SignupApi = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await API.post(
        "/api/account/signup",
        { email, username, password },
        { withCredentials: true }
      );

      console.log(response.data);
      //   const data = await response.data;

      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setError("Login failed");
    }
  };

  return {
    email,
    setEmail,
    username,
    setUsername,
    password,
    setPassword,
    error,
    handleSubmit,
  };
};
