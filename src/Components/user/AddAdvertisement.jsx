import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
export const AddAdvertisement = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const validation = {
    nameValidator: {
      required: {
        value: true,
        message: "This field is required",
      },
    },
  };
  const submitHandler = async (data) => {
    console.log(data);
    console.log(data.image[0]);
    data.userID = localStorage.getItem("id");

    const formData = new FormData();
    formData.append("AdName", data.AdName);
    formData.append("image", data.image[0]);
    formData.append("AdContent", data.AdContent);
    formData.append("startDate", data.startDate);
    formData.append("endDate", data.endDate);
    formData.append("userID", data.userID);

    const res = await axios.post(`/ad/addAdvertisementWithFile`, formData);
    console.log(res);
    console.log(res.data);
    navigate("/user/blank/viewHoardings");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(submitHandler)} className="ad-form">
        <h2 style={{ textAlign: "center" }}>Register Your Ad Campaign</h2>

        <label>Campaign Name</label>
        <input
          type="text"
          {...register("AdName", validation.nameValidator)}
          className="input-field"
        />
        <span className="error-msg">{errors.AdName?.message}</span>

        <label>Ad Image</label>
        <input
          type="file"
          {...register("image", validation.nameValidator)}
          className="input-field"
        />
        <span className="error-msg">{errors.image?.message}</span>

        <label>Ad Content</label>
        <input
          type="text"
          {...register("AdContent", validation.nameValidator)}
          className="input-field"
        />
        <span className="error-msg">{errors.AdContent?.message}</span>

        <label>Start Date & Time</label>
        <input
          type="datetime-local"
          {...register("startDate", validation.nameValidator)}
          className="input-field"
        />
        <span className="error-msg">{errors.startDate?.message}</span>

        <label>End Date & Time</label>
        <input
          type="datetime-local"
          {...register("endDate", validation.nameValidator)}
          className="input-field"
        />
        <span className="error-msg">{errors.endDate?.message}</span>

        <button type="submit" className="submit-btn">
          Register
        </button>
      </form>

      <style jsx>{`
                .form-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    background-color: #f4f4f4;
                    padding-top:365px;
                    margin-bottom:0;
                    padding-bottom:360px;
                    
                }
                .ad-form {
                    background: white;
                    padding: 30px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    width: 400px;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    
                                
                .ad-form h2 {
                    text-align: center;
                    margin-bottom: 15px;
                }
                .input-field {
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    width: 100%;
                }
                .error-msg {
                    color: red;
                    font-size: 12px;
                }
                .submit-btn {
                    background-color: #007bff;
                    color: white;
                    padding: 10px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background 0.3s;
                }
                .submit-btn:hover {
                    background-color: #0056b3;
                }
            `}</style>
    </div>
  );
};
