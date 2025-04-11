import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import "./Login.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const status = useParams().status;

  const submitHandler = async (data) => {
    try {
      const res = await axios.post("/user/login", data);
      console.log(res);
      console.log(res.response?.data?.message);

      if (res.status === 200) {
        localStorage.setItem("id", res.data.data._id);
        localStorage.setItem("role", res.data.data.roleId.name);
        if (res.data.data.roleId.name === "User") {
          setTimeout(() => {
            navigate("/user/loggedin");
          }, 2000);
        } else {
          setTimeout(() => {
            navigate("/agency/loggedin");
          }, 2000);
        }
      }
    } catch (error) {
      if (error.response.data.message) {
        toast.warn(`${error.response.data.message}`, {
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
      } else {
        toast.error("Some Thing Went Wrong!!!", {
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
    }
  };
  useEffect(() => {
    if (status === "reset") {
      toast.success("Password Reset Successfully!", {
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
    } else if (status === "register") {
      toast.success("User Registered Successfully!", {
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
    } else if (status === "logout") {
      toast.success("User LoggedOut Successfully!", {
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
  }, []);

  const validationSchema = {
    emailValidator: {
      required: {
        value: true,
        message: "*Please Enter Your Email",
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
              type="text"
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
          <div>
            Forget Password <Link to="/forgotPassword">Forget Password?</Link>
          </div>
          <div>
            <Link to="/">Home Page</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
