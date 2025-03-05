import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./HordingForm.css";

export const HordingForm = () => {
  const { register, handleSubmit } = useForm();
  const [getStates, setGetStates] = useState([]);
  const [getCities, setGetCities] = useState([]);
  const [getArea, setGetArea] = useState([]);

  const submitHandler = async (data) => {
    console.log(data);
    data.userId = localStorage.getItem("id");
    const res = await axios.post(`/hording/addHording`, data);
    console.log(res);
  };

  const getAllStates = async () => {
    const getStates = await axios.get("/state/");
    setGetStates(getStates.data.data);
  };

  const getAllCities = async (stateId) => {
    const getCities = await axios.get(`/city/getCityByStateId/${stateId}`);
    setGetCities(getCities.data.data);
  };

  const getAllAreas = async (cityId) => {
    const getArea = await axios.get(`/area/getAreaByCityId/${cityId}`);
    setGetArea(getArea.data.data);
  };

  useEffect(() => {
    getAllStates();
  }, []);

  return (
    <div className="hording-form-container">
      <h2 className="form-heading">Hording Registration</h2>
      <form className="custom-form" onSubmit={handleSubmit(submitHandler)}>
        <div className="row g-4">
          <div className="col-md-6">
            <div className="form-group">
              <label>Dimensions</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter dimensions (e.g., 10ft x 20ft)"
                {...register("hordingDimension")}
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>Hording Type</label>
              <select className="form-control" {...register("hordingType")}>
                <option value="Unipole">Unipole</option>
                <option value="Billboard">Billboard</option>
                <option value="Gantry">Gantry</option>
                <option value="Digital">Digital</option>
              </select>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>Hourly Rate</label>
              <div className="input-group">
                <span className="input-group-text">$</span>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter hourly rate"
                  {...register("hourlyRate")}
                />
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>Hording URL</label>
              <input
                type="text"
                className="form-control"
                placeholder="https://example.com"
                {...register("hordingURL")}
              />
            </div>
          </div>
        </div>

        <div className="form-divider" />

        <div className="row g-4">
          <div className="col-md-4">
            <div className="form-group">
              <label>State</label>
              <select
                className="form-control"
                {...register("stateId")}
                onChange={(e) => getAllCities(e.target.value)}
              >
                <option value="">Select State</option>
                {getStates?.map((state) => (
                  <option key={state._id} value={state._id}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-group">
              <label>City</label>
              <select
                className="form-control"
                {...register("cityId")}
                onChange={(e) => getAllAreas(e.target.value)}
              >
                <option value="">Select City</option>
                {getCities?.map((city) => (
                  <option key={city._id} value={city._id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-group">
              <label>Area</label>
              <select className="form-control" {...register("areaId")}>
                <option value="">Select Area</option>
                {getArea?.map((area) => (
                  <option key={area._id} value={area._id}>
                    {area.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="row g-4 mt-2">
          <div className="col-md-6">
            <div className="form-group">
              <label>Latitude</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter latitude coordinates"
                step="any"
                {...register("latitude")}
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>Longitude</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter longitude coordinates"
                step="any"
                {...register("longitude")}
              />
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-12">
            <button type="submit" className="submit-btn">
              Register Hording
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
