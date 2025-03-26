import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./FullHoarding.css";

export const FullHoarding = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [getHoarding, setGetHoarding] = useState(null);

  const getHoardingById = async () => {
    try {
      const res = await axios.get(`/hording/${id}`);
      setGetHoarding(res.data.data);
    } catch (error) {
      console.error("Error fetching hoarding:", error);
    }
  };
  const deleteHoardingById = async () => {
    try {
      const res = await axios.delete(`/hording/deleteHording/${id}`);
      console.log("Hoarding Deleted Successfully", res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getHoardingById();
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
      <div className="card shadow-lg overflow-hidden border-0">
        <div className="row g-0">
          {/* Image Section */}
          <div className="col-lg-7 position-relative">
            <div className="hoarding-image-container ratio ratio-4x3">
              <img
                src={getHoarding.hordingURL}
                alt="Hoarding Visual"
                className="img-fluid hover-scale"
              />
              <div className="image-overlay"></div>
            </div>
          </div>

          {/* Details Section */}
          <div className="col-lg-5 bg-light">
            <div className="card-body p-4 p-xl-5">
              <header className="mb-4">
                <h1 className="display-5 fw-bold text-primary mb-3">
                  {getHoarding.hordingType} Details
                </h1>
                <div className="d-flex align-items-center gap-3 text-muted">
                  <i className="bi bi-tag-fill"></i>
                  <small>Listing ID: {id}</small>
                </div>
              </header>

              <section className="details-grid">
                {/* Pricing Card */}
                <div className="detail-card bg-primary text-white rounded-3 p-4 mb-4">
                  <div className="d-flex justify-content-between align-items-center">
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
                </div>

                {/* Specifications */}
                <div className="detail-card mb-4">
                  <DetailItem label="Dimensions" icon="bi-aspect-ratio">
                    <span className="text-dark fw-medium">
                      {getHoarding.hordingDimension}
                    </span>
                  </DetailItem>

                  <DetailItem label="Location" icon="bi-geo-alt">
                    <div className="d-flex gap-2">
                      <div className="text-center">
                        <div className="text-primary fw-bold">Lat</div>
                        <div>{getHoarding.latitude}</div>
                      </div>
                      <div className="vr"></div>
                      <div className="text-center">
                        <div className="text-primary fw-bold">Lng</div>
                        <div>{getHoarding.longitude}</div>
                      </div>
                    </div>
                  </DetailItem>
                </div>

                {/* Location Details */}
                <div className="detail-card bg-primary-soft rounded-3 p-3 mb-4">
                  <DetailItem label="Area" icon="bi-pin-map">
                    <span className="text-dark fw-medium">
                      {getHoarding.areaId.name}
                    </span>
                  </DetailItem>
                  <DetailItem label="City" icon="bi-building">
                    <span className="text-dark fw-medium">
                      {getHoarding.cityId.name}
                    </span>
                  </DetailItem>

                  <DetailItem label="State" icon="bi-globe">
                    <span className="text-dark fw-medium">
                      {getHoarding.stateId.name}
                    </span>
                  </DetailItem>
                </div>
              </section>
              <footer className="mt-5">
                <div className="d-flex flex-column flex-lg-row gap-3">
                  <Link
                    to={`/agency/blank/displayHoarding`}
                    className="btn btn-primary btn-hover-scale px-4 py-3 flex-grow-1 text-center"
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    Back
                  </Link>
                  <Link
                    to={`/agency/blank/updateHoarding/${getHoarding._id}`}
                    className="btn btn-outline-primary btn-hover-scale px-4 py-3 flex-grow-1 text-center"
                  >
                    <i className="bi bi-pencil-square me-2"></i>
                    Update
                  </Link>
                  <button
                    onClick={() => {
                      deleteHoardingById();
                      setTimeout(() => {
                        navigate("/agency/blank/displayHoarding");
                      }, 2000);
                    }}
                    className="btn btn-danger btn-hover-scale px-4 py-3 flex-grow-1 text-center"
                  >
                    <i className="bi bi-trash me-2"></i>
                    Delete
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
  <div className="detail-item mb-3">
    <div className="d-flex align-items-center gap-2 mb-2">
      {icon && <i className={`bi ${icon} text-primary fs-5`}></i>}
      <span className="text-uppercase small text-muted fw-bold letter-spacing">
        {label}
      </span>
    </div>
    <div className="text-dark ps-4">{children}</div>
  </div>
);
