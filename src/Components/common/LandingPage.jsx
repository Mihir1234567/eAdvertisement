// import React from "react";
// import { Link } from "react-router-dom";
// import "./LandingPage.css";

// const LandingPage = () => {
//   return (
//     <div className="landing-page">
//       {/* Hero Section */}
//       <header className="hero-section bg-primary text-white text-center py-5">
//         <div className="container">
//           <h1 className="display-4 mb-4 fw-bold">Welcome to E-advertisement</h1>
//           <p className="lead mb-4">
//             Connecting agencies and users seamlessly for hoarding management.
//           </p>
//           <div className="cta-buttons">
//             <Link to="/login" className="btn btn-light btn-lg me-3 px-4 py-2">
//               Login
//             </Link>
//             <Link
//               to="/signup"
//               className="btn btn-outline-light btn-lg px-4 py-2"
//             >
//               Sign Up
//             </Link>
//           </div>
//         </div>
//       </header>

//       {/* Features Section */}
//       <section className="features-section py-5">
//         <div className="container">
//           <h2 className="text-center mb-5 display-5 fw-semibold">
//             Our Services
//           </h2>
//           <div className="row g-4">
//             <div className="col-md-6">
//               <div className="feature-card card h-100 shadow-lg p-4">
//                 <div className="card-body text-center">
//                   <div className="section-header mb-4">
//                     <h3 className="card-title mb-3 fw-bold">For Agencies</h3>
//                   </div>
//                   <p className="card-text mb-4">
//                     Manage your hoardings, update details, and track bookings
//                     with ease.
//                   </p>
//                   <Link
//                     to="/agency/dashboard"
//                     className="btn btn-success btn-lg px-4"
//                   >
//                     Agency Dashboard
//                   </Link>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-6">
//               <div className="feature-card card h-100 shadow-lg p-4">
//                 <div className="card-body text-center">
//                   <div className="section-header mb-4">
//                     <h3 className="card-title mb-3 fw-bold">For Users</h3>
//                   </div>
//                   <p className="card-text mb-4">
//                     Browse available hoardings, manage bookings, and advertise
//                     effectively.
//                   </p>
//                   <Link
//                     to="/user/dashboard"
//                     className="btn btn-info btn-lg px-4 text-white"
//                   >
//                     User Dashboard
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="footer bg-dark text-white py-4 mt-5">
//         <div className="container text-center">
//           <p className="mb-0">
//             &copy; {new Date().getFullYear()} E-advertisement. All rights
//             reserved.
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default LandingPage;
import { Link } from "react-router-dom";
import "./LandingPage.css"; // Custom CSS for extra styling

const LandingPage = () => {
  return (
    <div className="landing-page d-flex flex-column min-vh-100">
      {/* Header */}
      <header className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top px-4 py-3">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold text-primary fs-3">
            E-Advertisement
          </span>
          <div className="d-flex gap-3 align-items-center ms-auto">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <a href="#about" className="nav-link">
              About
            </a>
            <Link to="/login/user" className="nav-link">
              User Login
            </Link>
            <Link to="/login/agency" className="nav-link">
              Agency Login
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section text-white d-flex align-items-center">
        <div className="container text-center">
          <h1 className="display-3 fw-bold">
            Empowering Brands. Enabling Visibility.
          </h1>
          <p className="lead mb-4">
            Book prime hoardings in seconds or list your own!
          </p>
          <div className="cta-buttons">
            <Link to="/login/blank" className="btn btn-light btn-lg me-3">
              Login
            </Link>
            <Link to="/signup" className="btn btn-outline-light btn-lg">
              Sign Up
            </Link>
          </div>
        </div>
      </section>

      {/* Info Cards Section */}
      <section className="info-section py-5">
        <div className="container">
          <div className="row g-4">
            {/* For Users Card */}
            <div className="col-md-6">
              <div className="card h-100 shadow-sm custom-card">
                <div className="card-body">
                  <h4 className="card-title">For Users</h4>
                  <p className="card-text">
                    Discover a variety of premium hoardings at competitive
                    prices. Enjoy an intuitive booking interface, real-time
                    availability, and secure payment options.
                  </p>
                  <p className="card-text">
                    Our user-centric design makes finding and reserving the
                    ideal advertising space effortless. Experience convenience,
                    transparency, and reliability.
                  </p>
                  <Link
                    to="/user/dashboard"
                    className="btn btn-outline-primary mt-3"
                  >
                    Explore for Users
                  </Link>
                </div>
              </div>
            </div>
            {/* For Agencies Card */}
            <div className="col-md-6">
              <div className="card h-100 shadow-sm custom-card">
                <div className="card-body">
                  <h4 className="card-title">For Agencies</h4>
                  <p className="card-text">
                    Manage your ad spaces effortlessly and boost your revenue.
                    Our platform provides comprehensive tools to update
                    listings, track bookings, and optimize your inventory.
                  </p>
                  <p className="card-text">
                    Gain targeted exposure with detailed analytics and an
                    easy-to-use dashboard designed specifically for agencies.
                  </p>
                  <Link
                    to="/agency/dashboard"
                    className="btn btn-outline-success mt-3"
                  >
                    Explore for Agencies
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Content Section */}
      <section className="additional-content py-5 bg-light">
        <div className="container">
          <h2 className="mb-4 text-center" id="about">
            Why Choose E-Advertisement?
          </h2>
          <p className="mb-5 text-center">
            With state-of-the-art technology and a user-centric approach,
            E-Advertisement is your go-to platform for seamless hoarding
            management. Experience efficiency, transparency, and growth like
            never before.
          </p>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="p-4 border rounded custom-feature text-center">
                <h5>Reliability</h5>
                <p>
                  Trusted by leading brands and agencies for consistent
                  performance and results.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 border rounded custom-feature text-center">
                <h5>Innovation</h5>
                <p>
                  Cutting-edge tools and analytics that give you a competitive
                  edge in the market.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 border rounded custom-feature text-center">
                <h5>Support</h5>
                <p>
                  Round-the-clock assistance to ensure smooth operations and
                  peace of mind.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-4 mt-auto">
        <div className="container">
          <p>
            &copy; {new Date().getFullYear()} E-Advertisement. All rights
            reserved.
          </p>
          <div className="d-flex justify-content-center gap-3 mb-2">
            <a href="#" className="text-white text-decoration-none">
              Facebook
            </a>
            <a href="#" className="text-white text-decoration-none">
              Twitter
            </a>
            <a href="#" className="text-white text-decoration-none">
              LinkedIn
            </a>
          </div>
          <p>
            <a href="#" className="text-white-50 text-decoration-underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
