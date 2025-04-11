import axios from "axios";
import React, { useEffect, useState } from "react";

export const HoardingBookingDetails = () => {
  const [bookings, setBookings] = useState(null);
  const getBookings = async () => {
    const res = await axios.get("/booking");
    console.log(res.data);

    setBookings(res.data.data);
    console.log(bookings);
  };
  useEffect(() => {
    getBookings();
  }, []);

  return (
    <div>
      {bookings?.map((booking) => {
        <>
          <p>booking.Clint_Id.email</p>
          <p>booking.</p>
          <p>booking.</p>
          <p>booking.</p>
          <p>booking.</p>
          <p>booking.</p>
          <p>booking.</p>
          <p>booking.</p>
          <p>booking.</p>
          <p>booking.</p>
          <p>booking.</p>
        </>;
      })}
    </div>
  );
};
