import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./HordingForm.css";
import { useNavigate, useParams } from "react-router-dom";

export const UpdateHoarding = () => {
  const { id } = useParams();
  const navigator = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      const res = await axios.get("/hording/" + id);
      return res.data.data;
    },
  });
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const [area, setArea] = useState([]);

  const validator = {
    hordingdetails: {
      required: { value: true, message: "*Field Required" },
    },
    hourlyRate: {
      min: { value: 200, message: "*Minimum Hourly rate is 200" },
    },
  };

  const getAllStates = async () => {
    const res = await axios.get("/state/");
    setState(res.data.data);
  };

  const getCityByStateID = async (id) => {
    const res = await axios.get("/city/getCityByStateId/" + id);
    setCity(res.data.data);
  };

  const getAreaByCityID = async (id) => {
    const res = await axios.get("/area/getAreaByCityId/" + id);
    setArea(res.data.data);
  };

  const submitHandler = async (data) => {
    const userID = localStorage.getItem("id");
    data.userID = userID;

    const formData = new FormData();
    formData.append("hordingDimension", data.hordingDimension);
    formData.append("hordingType", data.hordingType);
    formData.append("hourlyRate", data.hourlyRate);
    formData.append("latitude", data.latitude);
    formData.append("longitude", data.longitude);
    formData.append("stateID", data.stateID);
    formData.append("cityID", data.cityID);
    formData.append("areaID", data.areaID);
    if (data.image[0]) formData.append("image", data.image[0]);
    formData.append("userID", data.userID);

    const res = await axios.put("/hording/updateHoarding/" + id, formData);
    navigator("/agency/blank/displayHoarding/fullHoarding/" + id);
  };

  useEffect(() => {
    getAllStates();
  }, []);

  return (
    <div className="hording-form-container">
      <h2 className="form-heading">Update Hoarding</h2>
      <form onSubmit={handleSubmit(submitHandler)} className="custom-form">
        {/* First Row */}
        <div className="row g-4">
          <div className="col-md-6">
            <div className="form-group">
              <label>Dimensions</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter dimensions (e.g., 10ft x 20ft)"
                {...register("hordingDimension", validator.hordingdetails)}
              />
              {errors.hordingDimension && (
                <span className="error-message">
                  {errors.hordingDimension.message}
                </span>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>Hoarding Type</label>
              <select
                className="form-control"
                {...register("hordingType", validator.hordingdetails)}
              >
                <option value="">Select Type</option>
                <option value="Unipole">Unipole</option>
                <option value="Billboard">Billboard</option>
                <option value="Gantry">Gantry</option>
                <option value="Digital">Digital</option>
              </select>
              {errors.hordingType && (
                <span className="error-message">
                  {errors.hordingType.message}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className="row g-4">
          <div className="col-md-6">
            <div className="form-group">
              <label>Hourly Rate</label>
              <div className="input-group">
                <span className="input-group-text">₹</span>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter hourly rate"
                  {...register("hourlyRate", {
                    ...validator.hordingdetails,
                    ...validator.hourlyRate,
                  })}
                />
              </div>
              {errors.hourlyRate && (
                <span className="error-message">
                  {errors.hourlyRate.message}
                </span>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>Upload New Image</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                {...register("image")}
              />
              <small className="text-muted">
                Leave blank to keep existing image
              </small>
            </div>
          </div>
        </div>

        <div className="form-divider"></div>

        {/* Location Section */}
        <div className="row g-4">
          <div className="col-md-4">
            <div className="form-group">
              <label>State</label>
              <select
                className="form-control"
                {...register("stateID", validator.hordingdetails)}
                onChange={(e) => getCityByStateID(e.target.value)}
              >
                <option value="">Select State</option>
                {state.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name}
                  </option>
                ))}
              </select>
              {errors.stateID && (
                <span className="error-message">{errors.stateID.message}</span>
              )}
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-group">
              <label>City</label>
              <select
                className="form-control"
                {...register("cityID", validator.hordingdetails)}
                onChange={(e) => getAreaByCityID(e.target.value)}
              >
                <option value="">Select City</option>
                {city.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
              {errors.cityID && (
                <span className="error-message">{errors.cityID.message}</span>
              )}
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-group">
              <label>Area</label>
              <select
                className="form-control"
                {...register("areaID", validator.hordingdetails)}
              >
                <option value="">Select Area</option>
                {area.map((a) => (
                  <option key={a._id} value={a._id}>
                    {a.name}
                  </option>
                ))}
              </select>
              {errors.areaID && (
                <span className="error-message">{errors.areaID.message}</span>
              )}
            </div>
          </div>
        </div>

        <div className="form-divider"></div>

        {/* Coordinates Section */}
        <div className="row g-4">
          <div className="col-md-6">
            <div className="form-group">
              <label>Latitude</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter latitude"
                step="any"
                {...register("latitude", validator.hordingdetails)}
              />
              {errors.latitude && (
                <span className="error-message">{errors.latitude.message}</span>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>Longitude</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter longitude"
                step="any"
                {...register("longitude", validator.hordingdetails)}
              />
              {errors.longitude && (
                <span className="error-message">
                  {errors.longitude.message}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12">
            <button type="submit" className="submit-btn">
              Update Hoarding
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
