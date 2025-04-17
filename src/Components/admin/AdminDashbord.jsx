import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

export const AdminDashboard = () => {
  const [users, setUsers] = useState(0);
  const [agencies, setAgencies] = useState(0);
  const [hoardings, setHoardings] = useState(0);
  const [bookings, setBookings] = useState(0);
  const [recentBookings, setRecentBookings] = useState([]);
  const [topAgencies, setTopAgencies] = useState([]);

  const [notAvailable, setNotAvailable] = useState(0);
  const [available, setAvailable] = useState(0);

  useEffect(() => {
    fetchStats();
    fetchRecentBookings();
    fetchTopAgencies();
  }, []);

  const fetchStats = async () => {
    try {
      const all = await axios.get("/users");
      const allHoardings = await axios.get("/hording/getAllHoardings");
      const allBookings = await axios.get("/booking/");

      const user = all.data.data;
      const hoarding = allHoardings.data.data;
      const booking = allBookings.data.data;

      const users = user.filter((u) => u.roleId.name === "User").length;
      setUsers(users);

      const agency = user.filter((u) => u.roleId.name === "Agency").length;
      setAgencies(agency);

      setHoardings(hoarding.length);
      setBookings(booking.length);
      const availableCount = hoarding.filter(
        (h) => h.AvailabilityStatus === true
      ).length;
      const notAvailableCount = hoarding.filter(
        (h) => h.AvailabilityStatus === false
      ).length;

      setNotAvailable(notAvailableCount);
      setAvailable(availableCount);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  const fetchRecentBookings = async () => {
    try {
      const { data } = await axios.get("/booking/");
      setRecentBookings(data.data.slice(0, 5));
    } catch (err) {
      console.error("Error fetching recent bookings:", err);
    }
  };

  const fetchTopAgencies = async () => {
    try {
      const { data } = await axios.get("/api/admin/agencies/top");
      setTopAgencies(data);
    } catch (err) {
      console.error("Error fetching top agencies:", err);
    }
  };

  const stats = [
    { title: "Total Users", value: users },
    { title: "Total Agencies", value: agencies },
    { title: "Total Hoardings", value: hoardings },
    { title: "Total Bookings", value: bookings },
  ];

  const pieData = {
    labels: ["Available", "Booked"],
    datasets: [
      {
        data: [available, notAvailable],
        backgroundColor: ["#28a745", "#dc3545"],
        hoverOffset: 4,
      },
    ],
  };

  const barData = {
    labels: ["Users", "Agencies", "Hoardings", "Bookings"],
    datasets: [
      {
        label: "Platform Stats",
        data: [users, agencies, hoardings, bookings],
        backgroundColor: "#007bff",
      },
    ],
  };

  return (
    <div className="container my-5">
      <h1 className="mb-4 text-primary">Admin Dashboard</h1>

      {/* Stat Cards */}
      <div className="row mb-4">
        {stats.map((stat, index) => (
          <div key={index} className="col-md-3 mb-3">
            <div className="card text-center shadow-sm">
              <div className="card-body">
                <h6 className="card-title text-muted">{stat.title}</h6>
                <h4 className="fw-bold">{stat.value}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Hoarding Status (Pie Chart)</h5>
              <Pie data={pieData} />
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Stats Overview (Bar Chart)</h5>
              <Bar data={barData} />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Recent Bookings</h5>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>User Email</th>
                  <th>Hoarding Type</th>
                  <th>Hourly Rate</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>{booking._id}</td>
                    <td>{booking.Clint_Id.email}</td>
                    <td>{booking.Hoarding_Id.hordingType}</td>
                    <td>₹{booking.Hoarding_Id.hourlyRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* You can add Top Agencies here if needed */}
    </div>
  );
};
