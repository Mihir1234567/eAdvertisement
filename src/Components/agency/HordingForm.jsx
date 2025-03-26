import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./HordingForm.css";
import { useNavigate } from "react-router-dom";

export const HordingForm = () => {
  /* -------------------------------- //useForm ------------------------------- */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /* ------------------------------- //useStates ------------------------------ */
  const [getStates, setGetStates] = useState([]);
  const [getCities, setGetCities] = useState([]);
  const [getArea, setGetArea] = useState([]);
  const Navigate = useNavigate();

  /* ----------------------------- //SubmitHandler ---------------------------- */
  const submitHandler = async (data) => {
    data.userId = localStorage.getItem("id");
    console.log(data);

    const formData = new FormData();
    formData.append("hordingDimension", data.hordingDimension);
    formData.append("hordingType", data.hordingType);
    formData.append("hourlyRate", data.hourlyRate);
    formData.append("image", data.image[0]);
    formData.append("stateId", data.stateId);
    formData.append("cityId", data.cityId);
    formData.append("areaId", data.areaId);
    formData.append("longitude", data.longitude);
    formData.append("latitude", data.latitude);
    formData.append("userId", data.userId);
    console.log(formData);

    const res = await axios.post(`/hording/addWithFile`, formData);
    console.log(res);
    Navigate("/agency/blank/displayHoarding");
  };

  /* ----------------------------- //GetAllStates ----------------------------- */
  const getAllStates = async () => {
    const getStates = await axios.get("/state/");
    setGetStates(getStates.data.data);
  };

  /* ------------------------- //GetAllCitiesByStateId ------------------------ */
  const getAllCities = async (stateId) => {
    const getCities = await axios.get(`/city/getCityByStateId/${stateId}`);
    setGetCities(getCities.data.data);
  };

  /* ---------------------------- //GetAreaByCityId --------------------------- */
  const getAllAreas = async (cityId) => {
    const getArea = await axios.get(`/area/getAreaByCityId/${cityId}`);
    setGetArea(getArea.data.data);
  };
  /* ------------------------------- validations ------------------------------ */
  const validationSchema = {
    dimensionValidation: {
      required: { value: true, message: "*Please Enter Hoarding Dimensions" },
    },
    hourlyRate: {
      required: { value: true, message: "*Please Enter Hourly Rate" },
      min: { value: 200, message: "*Minimum Hourly rate is 200" },
    },
    hoardingURL: {
      required: { value: true, message: "*Please Enter Hoarding URL" },
    },
    latitude: {
      required: { value: true, message: "*Please Enter Latitude" },
    },
    longitude: {
      required: { value: true, message: "*Please Enter Longitude" },
    },
    stateId: {
      required: { value: true, message: "*Please Select State" },
    },
    cityId: {
      required: { value: true, message: "*Please Select City" },
    },
    areaId: {
      required: { value: true, message: "*Please Select Area" },
    },
    hoardingType: {
      required: { value: true, message: "*Please Select Hoarding Type" },
    },
    hoardingImage: {
      required: { value: true, message: "*Please Add Hoarding Image" },
    },
  };

  /* ------------------------------- //useEffect ------------------------------ */
  useEffect(() => {
    getAllStates();
  }, []);

  return (
    <div className="hording-form-container">
      <h2 className="form-heading">Hoarding Registration</h2>
      <form className="custom-form" onSubmit={handleSubmit(submitHandler)}>
        <div className="row g-4">
          {/* ---------------------------- hoardingDimension ---------------------------- */}
          <div className="col-md-6">
            <div className="form-group">
              <label>Dimensions</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter dimensions (e.g., 10ft x 20ft)"
                {...register(
                  "hordingDimension",
                  validationSchema.dimensionValidation
                )}
              />

              <span style={{ color: "red" }}>
                {errors?.hordingDimension?.message}
              </span>
            </div>
          </div>

          {/* ------------------------------- hoardingType ------------------------------ */}
          <div className="col-md-6">
            <div className="form-group">
              <label>hoarding Type</label>
              <select
                className="form-control"
                {...register("hordingType", validationSchema.hoardingType)}
              >
                <option value="">Select Hoarding Type</option>
                <option value="Unipole">Unipole</option>
                <option value="Billboard">Billboard</option>
                <option value="Gantry">Gantry</option>
                <option value="Digital">Digital</option>
              </select>
              <span style={{ color: "red" }}>
                {errors?.hordingType?.message}
              </span>
            </div>
          </div>

          {/* ------------------------------- hourlyRate ------------------------------- */}
          <div className="col-md-6">
            <div className="form-group">
              <label>Hourly Rate</label>
              <div className="input-group">
                <span className="input-group-text">$</span>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter hourly rate"
                  {...register("hourlyRate", validationSchema.hourlyRate)}
                />
              </div>
              <span style={{ color: "red" }}>
                {errors?.hourlyRate?.message}
              </span>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>Add Hording Image</label>
              <input
                type="file"
                className="form-control"
                placeholder="https://example.com"
                {...register("image", validationSchema.hoardingImage)}
              />{" "}
              <span style={{ color: "red" }}>{errors?.image?.message}</span>
            </div>
          </div>
        </div>

        <div className="form-divider" />

        {/* ------------------------------ Location Section ------------------------------ */}
        <div className="row g-4">
          {/* ------------------------------ state dropdown ----------------------------- */}
          <div className="col-md-4">
            <div className="form-group">
              <label>State</label>
              <select
                className="form-control"
                {...register("stateId", validationSchema.stateId)}
                onChange={(e) => getAllCities(e.target.value)}
              >
                <option value="">Select State</option>
                {getStates?.map((state) => (
                  <option key={state._id} value={state._id}>
                    {state.name}
                  </option>
                ))}
              </select>
              <span style={{ color: "red" }}>{errors?.stateId?.message}</span>
            </div>
          </div>

          {/* ------------------------------ City Dropdown ----------------------------- */}
          <div className="col-md-4">
            <div className="form-group">
              <label>City</label>
              <select
                className="form-control"
                {...register("cityId", validationSchema.cityId)}
                onChange={(e) => getAllAreas(e.target.value)}
              >
                <option value="">Select City</option>
                {getCities?.map((city) => (
                  <option key={city._id} value={city._id}>
                    {city.name}
                  </option>
                ))}
              </select>
              <span style={{ color: "red" }}>{errors?.cityId?.message}</span>
            </div>
          </div>

          {/* ------------------------------ Area Dropdown ----------------------------- */}
          <div className="col-md-4">
            <div className="form-group">
              <label>Area</label>
              <select
                className="form-control"
                {...register("areaId", validationSchema.areaId)}
              >
                <option value="">Select Area</option>
                {getArea?.map((area) => (
                  <option key={area._id} value={area._id}>
                    {area.name}
                  </option>
                ))}
              </select>
              <span style={{ color: "red" }}>{errors?.areaId?.message}</span>
            </div>
          </div>
        </div>

        <div className="row g-4 mt-2">
          {/* ------------------------------- latitude ------------------------------- */}
          <div className="col-md-6">
            <div className="form-group">
              <label>Latitude</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter latitude coordinates"
                {...register("latitude", validationSchema.latitude)}
              />{" "}
              <span style={{ color: "red" }}>{errors?.latitude?.message}</span>
            </div>
          </div>

          {/* ------------------------------- longitude ------------------------------- */}
          <div className="col-md-6">
            <div className="form-group">
              <label>Longitude</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter longitude coordinates"
                step="any"
                {...register("longitude", validationSchema.latitude)}
              />{" "}
              <span style={{ color: "red" }}>{errors?.longitude?.message}</span>
            </div>
          </div>
        </div>

        {/* --------------------------------- Submit --------------------------------- */}
        <div className="row mt-5">
          <div className="col-12">
            <button type="submit" className="submit-btn">
              Register hoarding
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
