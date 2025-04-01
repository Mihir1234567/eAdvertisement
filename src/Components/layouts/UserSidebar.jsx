import React, { useEffect, useState } from "react";

import { Link, Outlet, useParams } from "react-router-dom";
import { UserNavbar } from "./UserNavbar";
import { Bounce, toast, ToastContainer } from "react-toastify";

export const UserSidebar = () => {
  const status = useParams().status;
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    console.log("toggleSidebar");
    setSidebarOpen(!isSidebarOpen);
  };
  useEffect(() => {
    if (status === "loggedin") {
      toast.success("Logged In Successfully!", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  }, []);

  return (
    <>
      {/* <AgencyNavbar toggleSidebar={toggleSidebar} /> */}
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      <UserNavbar toggleSidebar={toggleSidebar}></UserNavbar>
      <aside
        className={`app-sidebar bg-body-secondary shadow ${
          isSidebarOpen ? "open" : "d-none"
        }`}
        data-bs-theme="dark"
      >
        <div className="sidebar-brand">
          <Link to="/" className="brand-link">
            <span className="brand-text fw-light">E-Advertisement</span>
          </Link>
        </div>

        <div
          className=""
          data-overlayscrollbars-viewport="scrollbarHidden overflowXHidden overflowYScroll"
          tabIndex={-1}
          style={{
            marginRight: "-16px",
            marginBottom: "-16px",
            marginLeft: 0,
            top: "-8px",
            right: "auto",
            left: "-8px",
            width: "calc(100% + 16px)",
            padding: 8,
          }}
        >
          <nav className="mt-2">
            <ul
              className="nav sidebar-menu flex-column"
              data-lte-toggle="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item menu-open">
                <Link
                  to="/user/blank/viewHoardings"
                  className="nav-link active"
                >
                  <i className="nav-icon bi bi-speedometer" />
                  <p>
                    View Hoardings
                    <i className="nav-arrow bi bi-chevron-right" />
                  </p>
                </Link>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link
                      to="/user/blank/viewBookings"
                      className="nav-link active"
                    >
                      <i className="nav-icon bi bi-speedometer" />
                      <p>
                        View Your Bookings
                        <i className="nav-arrow bi bi-chevron-right" />
                      </p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/user/blank/addAd" className="nav-link active">
                      <i className="nav-icon bi bi-speedometer" />
                      <p>
                        Add Your Ad
                        <i className="nav-arrow bi bi-chevron-right" />
                      </p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/user/blank/viewYourAds"
                      className="nav-link active"
                    >
                      <i className="nav-icon bi bi-speedometer" />
                      <p>
                        View Your Ads
                        <i className="nav-arrow bi bi-chevron-right" />
                      </p>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      <main class="app-main">
        <Outlet></Outlet>
      </main>
    </>
  );
};
