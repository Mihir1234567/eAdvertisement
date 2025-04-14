import axios from "axios";
import React, { useEffect, useState } from "react";
import "./BookingTable.css";

export const HoardingBookingDetails = () => {
  const [bookings, setBookings] = useState([]);

  const getBookings = async () => {
    try {
      const res = await axios.get("/booking");
      setBookings(res.data.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

  return (
    <div className="container py-5">
      <div className="mb-4 text-center">
        <h2 className="section-title">📋 Booked Hoardings Overview</h2>
        <p className="text-muted">
          View all hoardings booked by users under your agency.
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center">
          <p className="alert alert-warning">No bookings found</p>
        </div>
      ) : (
        <div className="card shadow-lg p-4">
          <div className="table-responsive">
            <table className="table custom-table table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Hoarding</th>
                  <th>Type</th>
                  <th>Dimension</th>
                  <th>Rate (₹/hr)</th>
                  <th>Booked By</th>
                  <th>Age</th>
                  <th>Booking ID</th>
                  <th>Ad ID</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>
                      <img
                        src={booking.Hoarding_Id.hordingURL}
                        alt="Hoarding"
                        className="hoarding-img"
                      />
                    </td>
                    <td>{booking.Hoarding_Id.hordingType}</td>
                    <td>{booking.Hoarding_Id.hordingDimension}</td>
                    <td>₹{booking.Hoarding_Id.hourlyRate}</td>
                    <td>{booking.Clint_Id.email}</td>
                    <td>{booking.Clint_Id.age}</td>
                    <td className="small-text">{booking._id}</td>
                    <td className="small-text">{booking.AdId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
