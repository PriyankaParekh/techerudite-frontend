import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CustomerRegistrationPageController() {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    role: "customer",
  });

  const [errors, setErrors] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const nameRegex = /^[A-Za-z\s]+$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let trimmedValue = value.trim();
    let error = "";

    switch (name) {
      case "fname":
      case "lname":
        if (!nameRegex.test(trimmedValue) && trimmedValue !== "") {
          error = "Only letters and spaces are allowed";
        }
        break;

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

    if (!formData.fname) {
      newErrors.fname = "First name is required";
      isValid = false;
    } else if (!nameRegex.test(formData.fname)) {
      newErrors.fname = "Only letters and spaces are allowed";
      isValid = false;
    } else {
      newErrors.fname = "";
    }

    if (!formData.lname) {
      newErrors.lname = "Last name is required";
      isValid = false;
    } else if (!nameRegex.test(formData.lname)) {
      newErrors.lname = "Only letters and spaces are allowed";
      isValid = false;
    } else {
      newErrors.lname = "";
    }

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

  const handleRegister = async (submissionData: typeof formData) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        submissionData
      );

      if (response.data.Status === "success") {
        toast.success("Registration successful!");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error: any) {
      console.error("Register error:", error.response?.data || error.message);
      toast.error(error.response?.data?.error || "Internal server error");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const submissionData = {
      fname: formData.fname.trim(),
      lname: formData.lname.trim(),
      email: formData.email.trim(),
      password: formData.password.trim(),
      role: "customer",
    };

    if (validateForm()) {
      handleRegister(submissionData);
      setFormData({
        fname: "",
        lname: "",
        email: "",
        password: "",
        role: "",
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
  }, [navigate]);

  return {
    handleChange,
    handleSubmit,
    formData,
    errors,
  };
}

export default CustomerRegistrationPageController;
