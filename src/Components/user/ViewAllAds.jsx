import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ViewAllAds.css";

export const ViewAllAds = () => {
  const [ads, setAds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get(
          `/ad/getAdvertisementByUserId/${localStorage.getItem("id")}`
        );
        setAds(response.data.data);
        console.log(response.data.data);
        // console.log(response.data.data[0].addBannerUrl);
      } catch (err) {
        console.error("Error fetching ads:", err);
        setError("Failed to load ads. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAds();
  }, []);

  if (isLoading) {
    return (
      <div className="container my-5 d-flex justify-content-center align-items-center loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-5 text-center">
        <p className="alert alert-danger">{error}</p>
      </div>
    );
  }

  return (
    <>
      {/* Background elements */}
      <div
        className="background-deco circle"
        style={{ top: "10%", left: "-10%" }}
      />
      <div
        className="background-deco square"
        style={{ top: "50%", right: "-5%" }}
      />

      <div className="container my-5 view-ads-container">
        <h2 className="text-center mb-5 display-4 fw-bold text-gradient">
          Your Ads
        </h2>
        {ads.length === 0 ? (
          <div className="text-center py-5 no-ads-container">
            <i className="bi bi-inbox fs-1 text-muted mb-3"></i>
            <p className="fs-5 text-muted">No ads found</p>
          </div>
        ) : (
          <div className="row g-4">
            {ads.map(
              ({ _id, AdURL, AdName, AdContent, startDate, endDate }) => (
                <div key={_id || id} className="col-xl-4 col-md-6">
                  <div className="card ad-card h-100 shadow-sm">
                    <div className="image-wrapper ratio ratio-16x9 image-link">
                      <img
                        className="ad-image img-fluid rounded-top"
                        src={AdURL}
                        alt={`${AdName} advertisement`}
                      />
                      <div className="image-overlay"></div>
                    </div>
                    <div className="card-body p-4">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="card-title text-truncate">{AdName}</h5>
                      </div>
                      <p className="card-text text-muted mb-2">{AdContent}</p>
                      <div className="dates">
                        <p className="mb-1">
                          <strong>Start:</strong> {startDate}
                        </p>
                        <p className="mb-0">
                          <strong>End:</strong> {endDate}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </>
  );
};
