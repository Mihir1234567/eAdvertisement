import React from "react";
import { useForm } from "react-hook-form";
import "./Login.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { token } = useParams();
  console.log("Token from URL:", token);

  const submitHandler = async (data) => {
    // Debug: Check if values are present
    if (!token || !data.newPassword) {
      console.error("Missing token or newPassword");
      toast.error("Token or new password is missing. Please try again.");
      return;
    }

    const req = {
      token: token,
      newPassword: data.newPassword, // Check if this key matches backend expectation
    };

    console.log("Payload being sent:", req);

    try {
      await axios.post("/user/resetPassword", req);
      toast.success("Password reset successfully");
      navigate("/login/reset"); // Redirect to login or another page as needed
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("Failed to reset password");
    }
  };

  const validationSchema = {
    newPassword: {
      required: {
        value: true,
        message: "*Please enter a new password",
      },
    },
    cPassword: {
      required: {
        value: true,
        message: "*Please confirm your password",
      },
      validate: (value) =>
        value === getValues("newPassword") || "*Passwords do not match",
    },
  };

  return (
    <div className="main-container">
      <div className="login-box">
        <h1>Reset Password</h1>
        <form onSubmit={handleSubmit(submitHandler)} className="login-form">
          <div className="form-group">
            <label htmlFor="newPassword">Enter New Password</label>
            <input
              type="password"
              className="form-control"
              id="newPassword"
              placeholder="Enter Password"
              {...register("newPassword", validationSchema.newPassword)}
            />
            <span className="errormsg">{errors.newPassword?.message}</span>
          </div>

          <div className="form-group">
            <label htmlFor="cPassword">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="cPassword"
              placeholder="Confirm Password"
              {...register("cPassword", validationSchema.cPassword)}
            />
            <span className="errormsg">{errors.cPassword?.message}</span>
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Submit
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};
