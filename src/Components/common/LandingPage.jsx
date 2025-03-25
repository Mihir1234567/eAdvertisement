import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-container">
      <header className="header">
        <div className="container">
          <h1>E-Advertisement</h1>
        </div>
      </header>

      <main className="hero-section">
        <div className="container main-content">
          <h2 className="mb-4">Welcome to Our Ad Platform</h2>
          <p className="lead mb-5">
            Boost your business with our amazing advertising services! Reach
            your target audience and grow your brand with our cutting-edge
            marketing solutions.
          </p>

          <div className="cta-buttons">
            <Link to="/login/blank" className="btn btn-primary btn-lg">
              Login
            </Link>
            <Link to="/signup" className="btn btn-success btn-lg">
              Sign Up
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
