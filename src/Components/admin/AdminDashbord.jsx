import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export const AdminDashboard = () => {
  const [users, setUsers] = useState(0);
  const [agencies, setAgencies] = useState(0);
  const [hoardings, setHoardings] = useState(0);
  const [bookings, setBookings] = useState(0);
  const [recentBookings, setRecentBookings] = useState([]);
  const [topAgencies, setTopAgencies] = useState([]);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetchStats();
    fetchRecentBookings();
    fetchTopAgencies();
    fetchChartData();
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
      const hoardings = hoarding.length;
      setHoardings(hoardings);
      const bookings = booking.length;
      setBookings(bookings);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };
  const stats = [
    { title: "Total Users", value: users },
    { title: "Total Agencies ", value: agencies },
    { title: "Total Hoardings", value: hoardings },
    { title: "Total Bookings", value: bookings },
  ];

  const fetchRecentBookings = async () => {
    try {
      const { data } = await axios.get("/booking/");
      console.log("data", data.data);

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

  //   const fetchChartData = async () => {
  //   try {
  //     const response = await axios.get("/hording/getAllHoardings");
  //     console.log("Hoarding data:", response.data.data); // Check the actual data

  //     const hoardings = response.data.data;

  //     if (!hoardings || hoardings.length === 0) {
  //       setChartData(null);
  //       return;
  //     }

  //     let available = 0;
  //     let booked = 0;

  //     hoardings.forEach((h) => {
  //       // Check if isAvailable is a string or boolean
  //       const isAvailable = h.isAvailable === true || h.isAvailable === false;
  //       if (isAvailable) {
  //         available++;
  //       } else {
  //         booked++;
  //       }
  //     });

  //     console.log(`Available: ${available}, Booked: ${booked}`); // Debug counts

  //     setChartData({
  //       labels: ["Available", "Booked"],
  //       datasets: [
  //         {
  //           data: [available, booked],
  //           backgroundColor: ["#28a745", "#dc3545"],
  //           hoverOffset: 4, // Improves pie chart interactivity
  //         },
  //       ],
  //     });
  //   } catch (err) {
  //     console.error("Error fetching chart data:", err);
  //     setChartData(null);
  //   }
  // };

  return (
    <div className="container my-5">
      <h1 className="mb-4 text-primary">Admin Dashboard</h1>

      {/* Stat Cards */}
      <div className="row mb-4">
        {stats.map((stat, index) => (
          <div key={index} className="col-md-2 mb-3">
            <div className="card text-center shadow-sm">
              <div className="card-body">
                <h6 className="card-title text-muted">{stat.title}</h6>
                <h4 className="fw-bold"> {stat.value}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Hoarding Status</h5>
          {chartData ? <Pie data={chartData} /> : <div>Loading chart...</div>}
        </div>
      </div>
*/}

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
                  <th>hordingType</th>
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

      {/* Top Agencies */}
    </div>
  );
};
