import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const token = useParams().token;
  const { register, handleSubmit } = useForm();

  const submitHandler = async (data) => {
    const obj = {
      token: token,
      password: data.password,
    };
    console.log(obj);

    const res = await axios.post("/user/resetPassword", obj);
    navigate(`/login/reset`);
    console.log(res);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div>
          <label htmlFor="">Reset Password</label>
          <input type="text" {...register("password")} />
        </div>
        <div>
          <input type="submit" name="" id="" />
        </div>
      </form>
    </div>
  );
};
