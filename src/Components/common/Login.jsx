import React from "react";
import { useForm } from "react-hook-form";
import "./Login.css";
import { Link } from "react-router-dom";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submitHandler = (data) => {
    console.log(data);
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
