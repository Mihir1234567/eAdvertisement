import axios from "axios";
import React, { useEffect, useState } from "react";
import "./DisplayHoarding.css";
import { Link } from "react-router-dom";

export const DisplayHoardings = () => {
  const [getHoardings, setGetHoardings] = useState([]);

  const getAllHoardings = async () => {
    try {
      const res = await axios.get(
        `/hording/getHordingsByUserId/${localStorage.getItem("id")}`
      );
      setGetHoardings(res.data.data);
    } catch (error) {
      console.error("Error fetching hoardings:", error);
    }
  };

  useEffect(() => {
    getAllHoardings();
  }, []);

  return (
    <div className="container my-5 hoarding-container">
      <h2 className="text-center mb-5 display-4 fw-bold text-gradient">
        Your Hoardings
      </h2>
      {getHoardings.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-inbox fs-1 text-muted mb-3"></i>
          <p className="fs-5 text-muted">No hoardings found</p>
        </div>
      ) : (
        <div className="row g-4">
          {getHoardings.map((hoarding) => (
            <div key={hoarding.id} className="col-xl-4 col-md-6">
              <div className="card hoarding-card h-100 shadow-lg hover-scale">
                <Link
                  to={`fullHoarding/${hoarding._id}`}
                  className="image-wrapper ratio ratio-4x3 image-link"
                >
                  <img
                    className="hoarding-image img-fluid rounded-top"
                    src={hoarding.hordingURL}
                    alt={`${hoarding.hordingType} hoarding`}
                  />
                  <div className="image-overlay"></div>
                </Link>
                <div className="card-body p-4 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h5 className="card-title fs-5 fw-bold text-truncate pe-3">
                      {hoarding.hordingType}
                    </h5>
                    <span className="badge bg-primary-opacity-10 text-primary rounded-pill">
                      {hoarding.cityId?.name}
                    </span>
                  </div>
                  <p className="card-text text-muted mb-4">
                    <i className="bi bi-rulers me-2"></i>
                    {hoarding.hordingDimension}
                  </p>
                  <Link
                    to={`fullHoarding/${hoarding._id}`}
                    className="btn btn-primary btn-hover-scale mt-auto align-self-stretch"
                  >
                    <i className="bi bi-arrow-right me-2"></i>
                    View Full Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
