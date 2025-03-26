import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./Booking.css";
import { useNavigate, useParams } from "react-router-dom";

export const Booking = () => {
  const Hoarding_Id = useParams().id;
  /* -------------------------------- useForm -------------------------------- */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  /* --------------------------- Submit Handler ------------------------------ */
  const submitHandler = async (data) => {
    data.userId = localStorage.getItem("id");
    data.Hoarding_Id = Hoarding_Id;
    console.log(data);

    const formData = new FormData();
    formData.append("image", data.image[0]);
    formData.append("Clint_Id", data.userId);
    formData.append("AddContent", data.AddContent);
    formData.append("Hoarding_Id", data.Hoarding_Id);
    formData.append("Start_Time", data.Start_Time);
    formData.append("End_Time", data.End_Time);
    console.log(formData);

    const res = await axios.post(`/booking/addBookingWithFile`, formData);
    console.log(res);
  };

  /* ------------------------------ Validations ------------------------------ */
  const validationSchema = {
    adImage: {
      required: { value: true, message: "*Please Add Advertisement Image" },
    },
    startTime: {
      required: { value: true, message: "*Please Select Starting Time" },
    },
    endTime: {
      required: { value: true, message: "*Please Select Ending Time" },
    },

    AddContent: {
      required: { value: true, message: "*Please Enter Advertisement Content" },
    },
  };

  /* -------------------------------- useEffect ------------------------------ */
  useEffect(() => {}, []);

  return (
    <div className="hording-form-container">
      <h2 className="form-heading">Hoarding Registration</h2>
      <form className="custom-form" onSubmit={handleSubmit(submitHandler)}>
        <div className="row g-4">
          {/* ----------------------------- DateTime Inputs ---------------------------- */}
          <div className="col-md-6">
            <label htmlFor="startDateTime">Select Start Date and Time:</label>
            <input
              type="datetime-local"
              id="startDateTime"
              // onChange={(e) => setStartDateTime(e.target.value)}
              {...register("Start_Time", validationSchema.startTime)}
            />
            {errors?.Start_Time && (
              <span style={{ color: "red" }}>{errors.Start_Time.message}</span>
            )}
          </div>

          <div className="col-md-6">
            <label htmlFor="endDateTime">Select End Date and Time:</label>
            <input
              type="datetime-local"
              id="endDateTime"
              {...register("End_Time", validationSchema.endTime)}
            />
            {errors?.End_Time && (
              <span style={{ color: "red" }}>{errors.End_Time.message}</span>
            )}
          </div>

          {/* ------------------------------ Add Image ------------------------------ */}
          <div className="col-md-6">
            <div className="form-group">
              <label>Add Advertisement Image</label>
              <input
                type="file"
                className="form-control"
                placeholder="https://example.com"
                {...register("image", validationSchema.adImage)}
              />
              <span style={{ color: "red" }}>{errors?.image?.message}</span>
            </div>
          </div>
        </div>

        <div className="form-divider" />
        {/* ------------------------------- AddContent ------------------------------- */}

        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="">Enter Ad Description</label>
            <input
              type="text"
              {...register("AddContent", validationSchema.AddContent)}
            />
            {errors?.AddContent && (
              <span style={{ color: "red" }}>{errors.AddContent.message}</span>
            )}
          </div>
        </div>

        {/* ------------------------------- Submit Button ----------------------------- */}
        <div className="row mt-5">
          <div className="col-12">
            <button type="submit" className="submit-btn">
              Register Hoarding
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
