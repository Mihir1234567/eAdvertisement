import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [getBooking, setGetBooking] = useState(null);
  const [hoarding, setHoarding] = useState(null);
  console.log(getBooking);

  const userID = localStorage.getItem("id");
  const submitHandler = async () => {
    try {
      const res = await axios.delete(`/booking/deleteBookingById/${id}`);
      const res2 = await axios.put(
        `/hording/updateHoardingForBooking/${getBooking.Hoarding_Id?._id}`,
        {
          AvailabilityStatus: true,
        }
      );
      navigate(-1);
    } catch (error) {
      console.error("Error fetching Booking:", error);
    }
  };

  const getBookingById = async () => {
    try {
      const res = await axios.get(`/booking/getBookingById/${id}`);
      setGetBooking(res.data.data);
      const hoarding_id = res.data.data.Hoarding_Id._id;
      const res2 = await axios.get(`/hording/${hoarding_id}`);
      setHoarding(res2.data.data);
    } catch (error) {
      console.error("Error fetching Booking:", error);
    }
  };

  useEffect(() => {
    getBookingById();
  }, []);

  if (!getBooking) {
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
      <div className="card shadow-lg border-0">
        {/* Full Width Image without cropping */}
        <div style={{ width: "100%", overflow: "hidden" }}>
          <img
            src={getBooking.AdId?.AdURL}
            alt="Booking Visual"
            className="img-fluid w-100 hover-scale"
            style={{ objectFit: "contain" }}
          />
        </div>

        <div className="card-body p-4 p-xl-5">
          <div className="row g-4">
            {/* Hoarding Details Section */}
            <div className="col-12 col-lg-6">
              <div className="detail-card bg-light border rounded-3 p-4 h-100">
                <header className="mb-4">
                  <h1 className="display-6 fw-bold text-primary mb-3">
                    Hoarding Details
                  </h1>
                </header>

                <div className="mb-4">
                  <div className="detail-card bg-primary text-white rounded-3 p-3 mb-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h3 className="h4 fw-bold mb-0">
                          {/* ₹{getBooking.hourlyRate?.toLocaleString("en-IN")} */}
                          Work In Progress
                        </h3>
                        <small className="opacity-75">Total Cost</small>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <DetailItem label="Dimensions" icon="bi-aspect-ratio">
                      <span className="text-dark fw-medium">
                        {getBooking.Hoarding_Id?.hordingDimension}
                      </span>
                    </DetailItem>
                  </div>

                  <div className="mb-3">
                    <DetailItem label="Location" icon="bi-geo-alt">
                      <div className="d-flex gap-2">
                        <div className="text-center">
                          <div className="text-primary fw-bold">Lat</div>
                          <div>{getBooking.Hoarding_Id?.latitude}</div>
                        </div>
                        <div className="vr"></div>
                        <div className="text-center">
                          <div className="text-primary fw-bold">Lng</div>
                          <div>{getBooking.Hoarding_Id?.longitude}</div>
                        </div>
                      </div>
                    </DetailItem>
                  </div>

                  <div className="mt-4">
                    <DetailItem label="Area" icon="bi-pin-map">
                      <span className="text-dark fw-medium">
                        {hoarding?.areaId?.name}
                      </span>
                    </DetailItem>
                    <DetailItem label="City" icon="bi-building">
                      <span className="text-dark fw-medium">
                        {hoarding?.cityId?.name}
                      </span>
                    </DetailItem>
                    <DetailItem label="State" icon="bi-globe">
                      <span className="text-dark fw-medium">
                        {hoarding?.stateId?.name}
                      </span>
                    </DetailItem>
                  </div>
                </div>
              </div>
            </div>

            {/* Advertisement Details Section */}
            <div className="col-12 col-lg-6">
              <div className="detail-card bg-light border rounded-3 p-4 h-100">
                <header className="mb-4">
                  <h1 className="display-6 fw-bold text-primary mb-3">
                    Advertisement Details
                  </h1>
                </header>
                <div>
                  <h2 className="fw-bold text-primary mb-3">
                    {getBooking.AdId?.AdName}
                  </h2>
                  <p className="text-secondary mb-3">
                    {getBooking.AdId?.AdContent}
                  </p>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">
                      Start Date: {getBooking.AdId?.startDate}
                    </span>
                    <span className="text-muted">
                      End Date: {getBooking.AdId?.endDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <footer className="mt-5">
            <div className="d-flex flex-column flex-lg-row gap-3">
              <Link
                to={`/user/blank/viewBookings`}
                className="btn btn-primary btn-hover-scale px-4 py-3 flex-grow-1 text-center"
              >
                <i className="bi bi-arrow-left me-2"></i>
                Back
              </Link>
              <button
                onClick={submitHandler}
                className="btn btn-danger btn-outline btn-hover-scale px-4 py-3 flex-grow-1"
              >
                <i className="bi bi-pencil-square me-2"></i>
                Delete
              </button>
            </div>
          </footer>
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
