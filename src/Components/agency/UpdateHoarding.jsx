import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export const UpdateHoarding = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitError, setSubmitError] = useState("");

  /* -------------------------------- useForm ------------------------------- */
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  /* ------------------------------- States ------------------------------- */
  const [getStates, setGetStates] = useState([]);
  const [getCities, setGetCities] = useState([]);
  const [getArea, setGetArea] = useState([]);

  /* ---------------------------- Initial Data Fetch --------------------------- */
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [hoardingRes, statesRes] = await Promise.all([
          axios.get(`/hording/${id}`),
          axios.get("/state/"),
        ]);

        const hoardingData = hoardingRes.data.data;
        setGetStates(statesRes.data.data);

        if (hoardingData.stateId) {
          const citiesRes = await axios.get(
            `/city/getCityByStateId/${hoardingData.stateId}`
          );
          setGetCities(citiesRes.data.data);
        }

        if (hoardingData.cityId) {
          const areasRes = await axios.get(
            `/area/getAreaByCityId/${hoardingData.cityId}`
          );
          setGetArea(areasRes.data.data);
        }

        reset(hoardingData);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [id, reset]);

  /* ----------------------------- Submit Handler ---------------------------- */
  const submitHandler = async (data) => {
    try {
      setSubmitError("");
      const formData = new FormData();

      // Append all form data
      Object.entries(data).forEach(([key, value]) => {
        if (key === "image" && value[0]) {
          formData.append("image", value[0]);
        } else if (key !== "image") {
          formData.append(key, value);
        }
      });

      const response = await axios.put(
        `/hording/updateHoarding/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        navigate(`/agency/displayHoarding/fullHoarding/${id}`, {
          state: { refresh: true },
        });
      }
    } catch (error) {
      console.error("Update failed:", error);
      setSubmitError("Failed to update hoarding. Please try again.");
    }
  };

  /* ---------------------------- Location Handlers --------------------------- */
  const handleStateChange = async (stateId) => {
    try {
      const res = await axios.get(`/city/getCityByStateId/${stateId}`);
      setGetCities(res.data.data);
      setGetArea([]); // Reset areas when state changes
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleCityChange = async (cityId) => {
    try {
      const res = await axios.get(`/area/getAreaByCityId/${cityId}`);
      setGetArea(res.data.data);
    } catch (error) {
      console.error("Error fetching areas:", error);
    }
  };

  /* --------------------------- Validation Schema --------------------------- */
  const validationSchema = {
    hordingDimension: {
      required: "Please Enter Hoarding Dimensions",
    },
    hourlyRate: {
      required: "Please Enter Hourly Rate",
      min: { value: 200, message: "Minimum Hourly rate is 200" },
    },
    latitude: { required: "Please Enter Latitude" },
    longitude: { required: "Please Enter Longitude" },
    stateId: { required: "Please Select State" },
    cityId: { required: "Please Select City" },
    areaId: { required: "Please Select Area" },
    hordingType: { required: "Please Select Hoarding Type" },
    image: { required: "Please Add Hoarding Image" },
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="card shadow-lg p-4">
        <h2 className="mb-4 text-center">Update Hoarding</h2>

        {submitError && (
          <div className="alert alert-danger mb-4">{submitError}</div>
        )}

        <form onSubmit={handleSubmit(submitHandler)}>
          {/* Form fields remain mostly the same, but update these key parts: */}

          {/* State Dropdown */}
          <select
            {...register("stateId", validationSchema.stateId)}
            onChange={(e) => handleStateChange(e.target.value)}
            className="form-select mb-3"
          >
            {/* ... existing options ... */}
          </select>

          {/* Image Input */}
          <div className="mb-3">
            <label className="form-label">Hoarding Image</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              {...register("image", validationSchema.image)}
            />
            <small className="text-muted">Upload new image to update</small>
            {errors.image && (
              <div className="text-danger">{errors.image.message}</div>
            )}
          </div>

          {/* Submit Button */}
          <div className="d-grid gap-2 mt-4">
            <button type="submit" className="btn btn-primary btn-lg">
              Update Hoarding
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
