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

  const Navigate = useNavigate();
  /* ---------------------------- DateTime Splitter --------------------------- */
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [totalCost, setTotalCost] = useState(0);
  const [hoursDiff, setHoursDiff] = useState(0);
  // const getHoarding = async () => {
  //   const res = await axios.get(`/hording/${Hoarding_Id}`);
  //   console.log("Hoarding", res);
  //   const hourlyRate = res.data.data.hourlyRate;
  // };
  const calculateCost = async () => {
    const res = await axios.get(`/hording/${Hoarding_Id}`);
    //  console.log("Hoarding", res);
    setTimeout(() => {
      const hourlyRate = res.data.data.hourlyRate;
      // Convert input strings into Date objects
      const startDate = new Date(startDateTime);
      const endDate = new Date(endDateTime);

      // Calculate the difference in milliseconds
      const diffMs = endDate - startDate;

      // Convert milliseconds to hours
      const diffHours = diffMs / (1000 * 60 * 60);

      // Update state with the calculated hours
      setHoursDiff(diffHours);

      // Calculate the total cost based on hourly rate
      setTotalCost(diffHours * hourlyRate);
    }, 2000);
  };
  /* --------------------------- Submit Handler ------------------------------ */
  const submitHandler = async (data) => {
    data.userId = localStorage.getItem("id");
    data.Hoarding_Id = Hoarding_Id;
    console.log(data);
    setStartDateTime(data.Start_Time);
    setEndDateTime(data.End_Time);
    setTotalCost();
    console.log(totalCost);
    console.log(hoursDiff);

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
  useEffect(() => {
    calculateCost();
  }, []);

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
                onChange={() => {
                  splitDateTime(startDateTime);
                  splitDateTime(endDateTime);
                }}
                {...register("image", validationSchema.adImage)}
              />
              <span style={{ color: "red" }}>{errors?.image?.message}</span>
              <button
                onClick={() => {
                  calculateCost();
                }}
              >
                Calculate Total Cost
              </button>
              <span>{totalCost}</span>
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
