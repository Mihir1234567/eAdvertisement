import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";

export const SignUp = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    const res = await axios.post("/user/signup", data);
    console.log(res.data);
    if (res.status === 201) {
      toast.success("👍 User Created Successfully!", {
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
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      toast.error("👎 User Not Created Due To Error!", {
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
    ageValidator: {
      required: {
        value: true,
        message: "Please Enter Your Age",
      },
      min: {
        value: 20,
        message: "Minimum Age is 20.",
      },
    },
    emailValidator: {
      required: {
        value: true,
        message: "*Please Enter This Field",
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
      <ToastContainer />
      <div className="main-container ">
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
              <label htmlFor="age">Age</label>
              <input
                type="number"
                className="form-control"
                id="age"
                {...register("age", validationSchema.ageValidator)}
                placeholder="Enter Age"
              />
              <span className="errormsg">{errors.age?.message}</span>
            </div>

            <div>
              <div className="col-md-6">
                <label htmlFor="role" className="form-label">
                  Role
                </label>
                <select
                  className="form-select"
                  id="role"
                  required
                  defaultValue="67be91bc4691b9d14711e517"
                  {...register("roleId")}
                >
                  <option value="67be91bc4691b9d14711e517">User</option>
                  <option value="67be931e4691b9d14711e51e">Agency</option>
                </select>
                <div className="invalid-feedback">
                  Please select a valid state.
                </div>
              </div>

              <span className="errormsg">{errors.roleId?.message}</span>
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
              <Link to="/login/:">LogIn</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
