import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./assets/adminlte.css";
import "./assets/adminlte.min.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { UserProfile } from "./components/user/UserProfile";
import { AgencySidebar } from "./Components/agency/AgencySidebar";
// import { AgencyForm } from "./Components/agency/AgencyForm";
import { UserSidebar } from "./Components/layouts/UserSidebar";
import axios from "axios";
import "./App.css";
import { HordingForm } from "./Components/agency/HordingForm";
import PrivateRoutes from "./hooks/PrivateRouting";
import LandingPage from "./Components/common/LandingPage";
import { DisplayHoardings } from "./Components/agency/DisplayHoardings";
import { FullHoarding } from "./Components/agency/FullHoarding";
import { UpdateHoarding } from "./Components/agency/UpdateHoarding";
import { FullBookedHoarding } from "./Components/user/Fullbookedhosrding";
import { ViewHoardings } from "./Components/user/ViewHoardings";
import { Booking } from "./Components/user/Booking";
import { ViewYourBookings } from "./Components/user/ViewYourBookings";
import { SignUp } from "./Components/common/SignUp";
import { ResetPassword } from "./Components/common/ResetPAssword";
import { ForgotPassword } from "./Components/common/ForgotPassword";
import { Login } from "./Components/common/Login";
function App() {
  axios.defaults.baseURL = "http://localhost:3000";
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/Signup") {
      document.body.class = "";
    } else {
      document.body.class =
        "layout-fixed sidebar-expand-lg bg-body-tertiary sidebar-open app-loaded";
    }
  }, [location.pathname]);
  return (
    <div
      class={
        location.pathname === "/login" ||
        location.pathname === "/Signup" ||
        location.pathname === "/"
          ? ""
          : "app-wrapper"
      }
    >
      <Routes>
        <Route path="/login/:status" element={<Login></Login>}></Route>
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
        <Route path="/" element={<LandingPage></LandingPage>}></Route>
        <Route
          path="/resetPassword/:token"
          element={<ResetPassword></ResetPassword>}
        ></Route>

        <Route
          path="/forgotPassword"
          element={<ForgotPassword></ForgotPassword>}
        ></Route>

        <Route element={<PrivateRoutes></PrivateRoutes>}>
          <Route path="/user/:status" element={<UserSidebar></UserSidebar>}>
            <Route path="profile" element={<UserProfile></UserProfile>}></Route>
            <Route
              path="viewHoardings"
              element={<ViewHoardings></ViewHoardings>}
            ></Route>
            <Route
              path="fullHoardingUser/:id"
              element={<FullBookedHoarding></FullBookedHoarding>}
            ></Route>
            <Route path="booking/:id" element={<Booking></Booking>}></Route>
            <Route
              path="viewBookings"
              element={<ViewYourBookings></ViewYourBookings>}
            ></Route>
          </Route>
          <Route
            path="/agency/:status"
            element={<AgencySidebar></AgencySidebar>}
          >
            {/* <Route path="form" element={<AgencyForm></AgencyForm>}></Route> */}
            <Route
              path="hordingForm"
              element={<HordingForm></HordingForm>}
            ></Route>
            <Route
              path="updateHoarding/:id"
              element={<UpdateHoarding></UpdateHoarding>}
            ></Route>
            <Route path="displayHoarding">
              <Route index element={<DisplayHoardings />} />
              <Route path="fullHoarding/:id" element={<FullHoarding />} />
            </Route>
          </Route>
        </Route>
      </Routes>
      {/* <UserSidebar></UserSidebar> */}
    </div>
  );
}

export default App;
