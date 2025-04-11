import axios from "axios";
import React, { useEffect, useState } from "react";

export const HoardingBookingDetails = () => {
  const [bookings, setBookings] = useState([]);

  const getBookings = async () => {
    try {
      const res = await axios.get("/booking");
      console.log("Booking Response:", res.data);
      setBookings(res.data.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Booked Hoardings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={thStyle}>Hoarding</th>
              <th style={thStyle}>Type</th>
              <th style={thStyle}>Dimension</th>
              <th style={thStyle}>Rate (₹/hr)</th>
              <th style={thStyle}>Booked By</th>
              <th style={thStyle}>Client Age</th>
              <th style={thStyle}>Booking ID</th>
              <th style={thStyle}>Ad ID</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td style={tdStyle}>
                  <img
                    src={booking.Hoarding_Id.hordingURL}
                    alt="Hoarding"
                    style={{ width: "100px", borderRadius: "6px" }}
                  />
                </td>
                <td style={tdStyle}>{booking.Hoarding_Id.hordingType}</td>
                <td style={tdStyle}>{booking.Hoarding_Id.hordingDimension}</td>
                <td style={tdStyle}>{booking.Hoarding_Id.hourlyRate}</td>
                <td style={tdStyle}>{booking.Clint_Id.email}</td>
                <td style={tdStyle}>{booking.Clint_Id.age}</td>
                <td style={tdStyle}>{booking._id}</td>
                <td style={tdStyle}>{booking.AdId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const thStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  background: "#f4f4f4",
  textAlign: "left",
};

const tdStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  verticalAlign: "top",
};
