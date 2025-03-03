import React from "react";
import { useForm } from "react-hook-form";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const submitHandler = async (data) => {
    const res = await axios.post("/user/login", data);
    console.log(res);
    console.log(res.response?.data?.message);
    if (res.status === 200) {
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
      localStorage.setItem("id", res.data.data.roleId._id);
      localStorage.setItem("role", res.data.data.roleId.name);
      if (res.data.data.roleId.name === "User") {
        navigate("/user");
      } else {
        navigate("/agency");
      }
    } else if (res.response?.data?.message === "Invalid Email") {
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
    <div className="main-container">
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="login-box">
        <h1>Login</h1>
        <form onSubmit={handleSubmit(submitHandler)} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              {...register("email", validationSchema.emailValidator)}
              placeholder="Enter email"
            />
          </div>
          <span className="errormsg">{errors.email?.message}</span>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              {...register("password", validationSchema.passwordValidator)}
              placeholder="Password"
            />
            <span className="errormsg">{errors.password?.message}</span>
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Submit
          </button>
          <div>
            Don't Have An Account? <Link to="/signup">register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
