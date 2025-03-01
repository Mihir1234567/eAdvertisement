import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./assets/adminlte.css";
import "./assets/adminlte.min.css";
import { Route, Routes } from "react-router-dom";
import { UserProfile } from "./components/user/UserProfile";
import { Login } from "./components/common/Login";
import { SignUp } from "./components/common/SignUp";
import { AgencySidebar } from "./Components/agency/AgencySidebar";
import { AgencyForm } from "./Components/agency/AgencyForm";
import { UserSidebar } from "./Components/layouts/UserSidebar";
import axios from "axios";
function App() {
  const [count, setCount] = useState(0);
  axios.defaults.baseURL = "http://localhost:3000";

  return (
    <body class="layout-fixed sidebar-expand-lg bg-body-tertiary app-loaded sidebar-open">
      <div class="app-wrapper">
        <Routes>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/signup" element={<SignUp></SignUp>}></Route>
          <Route path="/user" element={<UserSidebar></UserSidebar>}>
            <Route path="profile" element={<UserProfile></UserProfile>}></Route>
          </Route>
          <Route path="/agency" element={<AgencySidebar></AgencySidebar>}>
            <Route path="form" element={<AgencyForm></AgencyForm>}></Route>
          </Route>
        </Routes>
        {/* <UserSidebar></UserSidebar> */}
      </div>
    </body>
  );
}

export default App;
