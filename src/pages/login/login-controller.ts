import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function LoginController() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let trimmedValue = value.trim();
    let error = "";

    switch (name) {
      case "email":
        if (!emailRegex.test(trimmedValue) && trimmedValue !== "") {
          error = "Please enter a valid email address";
        }
        break;

      case "password":
        if (!passwordRegex.test(trimmedValue) && trimmedValue !== "") {
          error =
            "Password must contain at least 8 characters with 1 uppercase, 1 lowercase, 1 number and 1 special character";
        }
        break;

      default:
        break;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    } else {
      newErrors.email = "";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must contain at least 8 characters with 1 uppercase, 1 lowercase, 1 number and 1 special character";
      isValid = false;
    } else {
      newErrors.password = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async (submissionData: typeof formData) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        submissionData
      );

      if (response.data.Status === "success") {
        // You can save the token if needed
        localStorage.setItem("token", response.data.authToken);
        if (response.data.data.role === "admin") {
          toast.success("Login Successfull.");
          navigate("/");
        } else {
          toast.error("You are not allowed to login from here.");
        }
      } else {
        toast.error("Login failed!");
      }
    } catch (error: any) {
      console.error(
        "Login error:",
        error.response?.data?.error || error.message
      );
      toast.error(error.response?.data?.error || "Internal server error");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const submissionData = {
      email: formData.email.trim(),
      password: formData.password.trim(),
    };

    if (validateForm()) {
      handleLogin(submissionData);
      setFormData({
        email: "",
        password: "",
      });
    } else {
      console.log("Form validation failed");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  return {
    handleChange,
    handleSubmit,
    formData,
    errors,
  };
}

export default LoginController;
