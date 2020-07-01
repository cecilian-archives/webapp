import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import CecilianAppBar from "./components/CecilianAppBar";
import CecilianLogosFooter from "./components/CecilianLogosFooter";
import StartPage from "./components/root/StartPage";
import MinutesPage from "./components/root/MinutesPage";
import PhotosPage from "./components/root/PhotosPage";
import PalettePage from "./components/root/PalettePage";
import TempScanPage from "./components/root/TempScanPage";
import PeopleManagementPage from "./components/root/PeopleManagementPage";
import PrototypeDemo from "./components/root/PrototypeDemo";
import LoginPage from "./components/root/LoginPage";

const App = () => (
  <Router>
    <CecilianAppBar />
    <div style={{ flexGrow: "1" }}>
      <Routes>
        <Route path="/" element={<Outlet />} />
        <Route path="search" element={<Outlet />} />
        <Route path="browse" element={<Outlet />} />
        <Route path="items" element={<Outlet />}>
          <Route path="/" element={<Navigate to="prototype" />} />
          <Route path="prototype" element={<PrototypeDemo />} />
        </Route>
        <Route path="people" element={<Outlet />} />
        <Route path="collections" element={<Outlet />} />
        <Route path="upload" element={<Outlet />}>
          <Route path="/" element={<StartPage />} />
          <Route path="minutes" element={<MinutesPage />} />
          <Route path="photos" element={<PhotosPage />} />
        </Route>
        <Route path="admin" element={<Outlet />}>
          <Route path="palette" element={<PalettePage />} />
          <Route path="scangen" element={<TempScanPage />} />
          <Route path="people" element={<PeopleManagementPage />} />
        </Route>
        <Route path="login" element={<LoginPage />} />

        <Route path="auth" element={<Navigate to="/login" />} />
        <Route path="account" element={<Navigate to="/people/me" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
    <CecilianLogosFooter />
  </Router>
);

export default App;
