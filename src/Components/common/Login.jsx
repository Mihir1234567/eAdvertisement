import React from "react";
import { useForm } from "react-hook-form";
import "./Login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submitHandler = async (data) => {
    // console.log(data);

    const res = await axios.post("/user/login", data);
    console.log(res);
    console.log(res.response.data.message);
    console.log(res.data);
    if (res.status === 201) {
      toast.success("👍 LoggedIn Successfully!", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } else if (res.response.data.message === "Invalid Email") {
      toast.error("Invalid Email", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };
  const validationSchema = {
    emailValidator: {
      required: {
        value: true,
        message: "*Please Enter Your Email",
      },
      pattern: {
        value: /[a-zA-Z0-9][@]{1}[a-zA-Z]/,
        message: "*Invalid Email",
      },
    },
    passwordValidator: {
      required: {
        value: true,
        message: "*Please Enter Your Password",
      },
    },
  };

  return (
    <div class="main-container">
      <div class="login-box">
        <h1>Login</h1>
        <form onSubmit={handleSubmit(submitHandler)} class="login-form">
          <div class="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              class="form-control"
              id="email"
              {...register("email", validationSchema.emailValidator)}
              placeholder="Enter email"
            />
          </div>
          <span class="errormsg">{errors.email?.message}</span>

          <div class="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              {...register("password", validationSchema.passwordValidator)}
              placeholder="Password"
            />
            <span class="errormsg">{errors.password?.message}</span>
          </div>

          <button type="submit" class="btn btn-primary btn-block">
            Submit
          </button>
          <div>
            Don't Have An Account?
            <Link to="/signup">register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
