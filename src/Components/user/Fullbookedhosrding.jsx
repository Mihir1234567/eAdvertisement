import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export const FullBookedHoarding = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [getHoarding, setGetHoarding] = useState(null);
  const [getAds, setGetAds] = useState([]);
  const [selectedAd, setSelectAd] = useState(null);
  const userID = localStorage.getItem("id");
  const object = {
    Clint_Id: userID,
    Hoarding_Id: id,
    AdId: selectedAd,
  };

  const submitHandler = async () => {
    try {
      const res = await axios.post(`/booking/addBooking`, object);
      // console.log(res);

      if (res.status === 201) {
        const res = await axios.put(`/hording/updateHoardingForBooking/${id}`, {
          AvailabilityStatus: false,
        });
        // console.log(res.data.data);

        navigate(-1);
      }
    } catch (error) {
      console.error("Error booking hoarding:", error);
    }
  };

  const getHoardingById = async () => {
    try {
      const res = await axios.get(`/hording/${id}`);
      setGetHoarding(res.data.data);
    } catch (error) {
      console.error("Error fetching hoarding:", error);
    }
  };

  const getAdvertisementByUserId = async () => {
    try {
      const res = await axios.get(`/ad/getAdvertisementByUserId/${userID}`);
      setGetAds(res.data.data);
    } catch (error) {
      console.error("Error fetching advertisement:", error);
    }
  };

  useEffect(() => {
    getHoardingById();
    getAdvertisementByUserId();
  }, []);

  if (!getHoarding) {
    return (
      <div className="d-flex justify-content-center my-5 py-5">
        <div
          className="spinner-grow text-primary"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="card shadow border-0">
        <div className="row g-0">
          {/* Image Section */}
          <div className="col-lg-7">
            <div className="ratio ratio-4x3 position-relative rounded overflow-hidden">
              <img
                src={getHoarding.hordingURL}
                alt="Hoarding Visual"
                className="img-fluid w-100 h-100"
              />
              {/* Static overlay using Bootstrap opacity classes */}
              <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-25"></div>
            </div>
          </div>

          {/* Details Section */}
          <div className="col-lg-5 bg-light">
            <div className="card-body p-4">
              <header className="mb-4">
                <h1 className="display-5 fw-bold text-primary mb-3">
                  {getHoarding.hordingType} Details
                </h1>
                <div className="d-flex align-items-center text-muted">
                  <i className="bi bi-tag-fill me-2"></i>
                  <small>Listing ID: {id}</small>
                </div>
              </header>

              <section className="mb-4">
                {/* Pricing Card */}
                <div className="p-4 mb-4 bg-primary text-white rounded shadow-sm d-flex justify-content-between align-items-center">
                  <div>
                    <h3 className="h2 fw-bold mb-0">
                      ₹{getHoarding.hourlyRate?.toLocaleString("en-IN")}
                    </h3>
                    <small className="opacity-75">per hour</small>
                  </div>
                  <span
                    className={`badge rounded-pill fs-6 ${
                      getHoarding.AvailabilityStatus
                        ? "bg-success"
                        : "bg-danger"
                    }`}
                  >
                    {getHoarding.AvailabilityStatus ? "Available" : "Booked"}
                  </span>
                </div>

                {/* Specifications */}
                <div className="mb-4">
                  <DetailItem label="Dimensions" icon="bi-aspect-ratio">
                    <span className="fw-medium text-dark">
                      {getHoarding.hordingDimension}
                    </span>
                  </DetailItem>
                  <DetailItem label="Location" icon="bi-geo-alt">
                    <div className="d-flex">
                      <div className="text-center me-3">
                        <div className="text-primary fw-bold">Lat</div>
                        <div>{getHoarding.latitude}</div>
                      </div>
                      <div className="vr me-3"></div>
                      <div className="text-center">
                        <div className="text-primary fw-bold">Lng</div>
                        <div>{getHoarding.longitude}</div>
                      </div>
                    </div>
                  </DetailItem>
                </div>

                {/* Location Details */}
                <div className="p-3 mb-4 bg-primary bg-opacity-10 rounded">
                  <DetailItem label="Area" icon="bi-pin-map">
                    <span className="fw-medium text-dark">
                      {getHoarding.areaId?.name}
                    </span>
                  </DetailItem>
                  <DetailItem label="City" icon="bi-building">
                    <span className="fw-medium text-dark">
                      {getHoarding.cityId?.name}
                    </span>
                  </DetailItem>
                  <DetailItem label="State" icon="bi-globe">
                    <span className="fw-medium text-dark">
                      {getHoarding.stateId?.name}
                    </span>
                  </DetailItem>
                </div>

                {/* Advertisement Select */}
                <div className="p-3 mb-4 bg-primary bg-opacity-10 rounded">
                  <select
                    className="form-select"
                    onChange={(e) => setSelectAd(e.target.value)}
                  >
                    <option value="">Select Your Advertisement</option>
                    {getAds.map((ads) => (
                      <option key={ads._id} value={ads._id}>
                        {ads.AdName}
                      </option>
                    ))}
                  </select>
                </div>
              </section>

              <footer className="mt-5">
                <div className="d-flex flex-column flex-lg-row gap-3">
                  <Link
                    to={`/user/blank/booking`}
                    className="btn btn-primary px-4 py-3 flex-grow-1 text-center"
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    Back
                  </Link>
                  <button
                    onClick={() => {
                      submitHandler();
                    }}
                    className="btn btn-outline-primary px-4 py-3 flex-grow-1"
                  >
                    <i className="bi bi-pencil-square me-2"></i>
                    Book
                  </button>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ label, children, icon }) => (
  <div className="mb-3">
    <div className="d-flex align-items-center gap-2 mb-2">
      {icon && <i className={`bi ${icon} text-primary fs-5`}></i>}
      <span className="text-uppercase small text-muted fw-bold">{label}</span>
    </div>
    <div className="ps-4">{children}</div>
  </div>
);
