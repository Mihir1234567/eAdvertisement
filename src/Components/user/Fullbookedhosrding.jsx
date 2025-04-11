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

  useEffect(() => {
    getHoardingById();
    getAdvertisementByUserId();
  }, []);

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

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const payNow = async () => {
    if (!selectedAd) {
      alert("Please select an advertisement first.");
      return;
    }

    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      const amount = 500000; // ₹5000 in paise
      const receipt = `receipt_${Date.now()}`;

      // STEP 1: Create Razorpay Order
      const { data: order } = await axios.post("/payment/createOrder", {
        amount,
        receipt,
      });

      console.log("✅ Order created:", order);

      if (!order.data.id) {
        console.error("❌ Order ID missing from backend");
        return alert("Something went wrong while creating order.");
      }

      // STEP 2: Initialize Razorpay
      const options = {
        key: "rzp_test_VviWfcUojQnAKT",
        amount: order.data.amount,
        currency: "INR",
        name: "E-Advertising",
        description: "Hoarding Booking",
        order_id: order.data.id,
        handler: async function (response) {
          console.log("✅ Razorpay response:", response);

          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            response;

          if (
            !razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature
          ) {
            return alert("Incomplete payment data received.");
          }

          // STEP 3: Verify Signature
          const verifyRes = await axios.post("/payment/verifyPayment", {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
          });

          if (verifyRes.data.success) {
            try {
              // STEP 4: Add Booking
              const bookingRes = await axios.post(`/booking/addBooking`, {
                Clint_Id: userID,
                Hoarding_Id: id,
                AdId: selectedAd,
              });

              if (bookingRes.status === 201) {
                const updateRes = await axios.put(
                  `/hording/updateHoardingForBooking/${id}`,
                  { AvailabilityStatus: false }
                );

                // STEP 5: Save Payment Info
                await axios.post("/payment/addPayments", {
                  Client_Id: userID,
                  Booking_Id: bookingRes.data._id,
                  razorpay_order_id,
                  razorpay_payment_id,
                });

                if (updateRes.status === 200) {
                  alert("✅ Payment successful and hoarding booked!");
                  navigate("/user/blank/viewHoardings");
                } else {
                  alert("⚠️ Hoarding booked but availability update failed.");
                }
              } else {
                alert("⚠️ Payment succeeded but booking failed.");
              }
            } catch (error) {
              console.error("❌ Error during booking:", error);
              alert("Something went wrong after payment.");
            }
          } else {
            alert("❌ Payment verification failed.");
          }
        },
        prefill: {
          name: "User",
          email: "user@example.com",
        },
        theme: {
          color: "#0d6efd",
        },
      };

      console.log("🔧 Razorpay options:", options);
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("❌ Error during Razorpay flow:", err);
      alert("Something went wrong while processing your payment.");
    }
  };

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
          <div className="col-lg-7">
            <div className="ratio ratio-4x3 position-relative rounded overflow-hidden">
              <img
                src={getHoarding.hordingURL}
                alt="Hoarding Visual"
                className="img-fluid w-100 h-100"
              />
              <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-25"></div>
            </div>
          </div>

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
                    to={`/user/blank/viewHoardings`}
                    className="btn btn-primary px-4 py-3 flex-grow-1 text-center"
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    Back
                  </Link>
                  <button
                    onClick={payNow}
                    className="btn btn-outline-primary px-4 py-3 flex-grow-1"
                  >
                    <i className="bi bi-cash-coin me-2"></i>
                    Pay & Book
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
