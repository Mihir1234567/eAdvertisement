import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "./ResetPassword.css"; // Custom CSS import

export const ResetPassword = () => {
  const navigate = useNavigate();
  const token = useParams().token;
  const { register, handleSubmit } = useForm();

  const submitHandler = async (data) => {
    const obj = {
      token: token,
      password: data.password,
    };

    try {
      const res = await axios.post("/user/resetPassword", obj);
      navigate(`/login/reset`);
      toast.success("Password reset successfully!");
    } catch (error) {
      toast.error("Error resetting password. Please try again.");
    }
  };

  return (
    // <div className="reset-password-container">
    //   <div className="card reset-card shadow-lg">
    //     <div className="card-header bg-primary text-white">
    //       <h3 className="card-title mb-0">Reset Your Password</h3>
    //     </div>
    //     <div className="card-body">
    //       <form onSubmit={handleSubmit(submitHandler)}>
    //         <div className="mb-4">
    //           <label htmlFor="password" className="form-label">
    //             New Password
    //           </label>
    //           <input
    //             type="password"
    //             className="form-control form-control-lg"
    //             {...register("password")}
    //             placeholder="Enter new password"
    //             required
    //           />
    //         </div>
    //         <div className="d-grid">
    //           <button type="submit" className="btn btn-primary btn-lg">
    //             Reset Password
    //           </button>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    //   <ToastContainer
    //     position="top-center"
    //     autoClose={5000}
    //     transition={Bounce}
    //   />
    // </div>
    
  );
};
// import React, { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import "./Login.css";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { Bounce, toast, ToastContainer } from "react-toastify";

// export const Login = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const navigate = useNavigate();
//   const status = useParams().status;
//   const submitHandler = async (data) => {
//     const res = await axios.post("/user/login", data);
//     console.log(res);
//     console.log(res.response?.data?.message);

//     if (res.status === 200) {
//       localStorage.setItem("id", res.data.data._id);
//       localStorage.setItem("role", res.data.data.roleId.name);
//       if (res.data.data.roleId.name === "User") {
//         setTimeout(() => {
//           navigate("/user/loggedin");
//         }, 2000);
//       } else {
//         setTimeout(() => {
//           navigate("/agency/loggedin");
//         }, 2000);
//       }
//     }
//   };
//   useEffect(() => {
//     if (status === "reset") {
//       toast.success("Password Reset Successfully!", {
//         position: "top-left",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "colored",
//         transition: Bounce,
//       });
//     } else if (status === "register") {
//       toast.success("User Registered Successfully!", {
//         position: "top-left",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "colored",
//         transition: Bounce,
//       });
//     } else if (status === "logout") {
//       toast.success("User LoggedOut Successfully!", {
//         position: "top-left",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "colored",
//         transition: Bounce,
//       });
//     }
//   }, []);

//   const validationSchema = {
//     emailValidator: {
//       required: {
//         value: true,
//         message: "*Please Enter Your Email",
//       },
//     },
//     passwordValidator: {
//       required: {
//         value: true,
//         message: "*Please Enter Your Password",
//       },
//     },
//   };

//   return (
//     <div className="main-container">
//       <ToastContainer
//         position="top-left"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick={false}
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//         transition={Bounce}
//       />

//       <div className="login-box">
//         <h1>Login</h1>
//         <form onSubmit={handleSubmit(submitHandler)} className="login-form">
//           <div className="form-group">
//             <label htmlFor="email">Email address</label>
//             <input
//               type="email"
//               className="form-control"
//               id="email"
//               {...register("email", validationSchema.emailValidator)}
//               placeholder="Enter email"
//             />
//           </div>
//           <span className="errormsg">{errors.email?.message}</span>

//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <input
//               type="text"
//               className="form-control"
//               id="password"
//               {...register("password", validationSchema.passwordValidator)}
//               placeholder="Password"
//             />
//             <span className="errormsg">{errors.password?.message}</span>
//           </div>

//           <button type="submit" className="btn btn-primary btn-block">
//             Submit
//           </button>
//           <div>
//             Don't Have An Account? <Link to="/signup">register</Link>
//           </div>
//           <div>
//             Forget Password <Link to="/forgotPassword">Forget Password?</Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
