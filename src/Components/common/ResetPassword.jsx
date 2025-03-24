import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

export const ResetPassword = () => {
  const token = useParams().token;
  const { register, handleSubmit } = useForm();

  const submitHandler = async (data) => {
    const obj = {
      token: token,
      password: data.password,
    };
    console.log(obj);

    const res = await axios.post("/user/resetPassword", obj);

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
