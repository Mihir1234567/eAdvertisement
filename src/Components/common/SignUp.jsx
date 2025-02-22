import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./Login.css";
import { Link } from "react-router-dom";

export const SignUp = () => {
  const [password, setPassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = (data) => {
    console.log(data);
  };

  const validationSchema = {
    nameValidator: {
      required: {
        value: true,
        message: "*Please Enter This Field",
      },
      minLength: {
        value: 3,
        message: "*Minimum Name Length is 3",
      },
    },
    emailValidator: {
      required: {
        value: true,
        message: "*Please Enter This Field",
      },
      pattern: {
        value: /[a-zA-Z0-9][@]{1}[a-zA-Z]/,
        message: "*Invalid Email",
      },
    },
    passwordValidator: {
      required: {
        value: true,
        message: "*Please Enter This Field",
      },
    },
    cPasswordValidator: {
      required: {
        value: true,
        message: "*Please Enter This Field",
      },
      validate: (value) => value === password || "*Password Does Not Match",
    },
  };

  return (
    <div>
      <div className="main-container dgdeg">
        <div className="login-box">
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit(submitHandler)} className="login-form">
            <div>
              <label htmlFor="Name">Name</label>
              <input
                type="text"
                className="form-control"
                id="Name"
                {...register("Name", validationSchema.nameValidator)}
                placeholder="Name"
              />
              <span className="errormsg">{errors.Name?.message}</span>
            </div>
            <div>
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                {...register("email", validationSchema.emailValidator)}
                placeholder="Enter email"
              />
              <span className="errormsg">{errors.email?.message}</span>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                {...register("password", validationSchema.passwordValidator)}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="errormsg">{errors.password?.message}</span>
            </div>
            <div>
              <label htmlFor="cPassword">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="cPassword"
                {...register("cPassword", validationSchema.cPasswordValidator)}
                placeholder="Confirm Password"
              />
              <span className="errormsg">{errors.cPassword?.message}</span>
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Submit
            </button>
            <div>
              Already Have An Account?
              <Link to="/login">LogIn</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
