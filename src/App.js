import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
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

const App = () => {
  console.info(
    `${process.env.REACT_APP_NAME} v${process.env.REACT_APP_VERSION}`
  );
  return (
    <Router>
      <CecilianAppBar />
      <div style={{ flexGrow: "1" }}>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/minutes" element={<MinutesPage />} />
          <Route path="/photos" element={<PhotosPage />} />
          <Route path="/palette" element={<PalettePage />} />
          <Route path="/scangen" element={<TempScanPage />} />
          <Route path="/people" element={<PeopleManagementPage />} />
          <Route path="/prototype" element={<PrototypeDemo />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <CecilianLogosFooter />
    </Router>
  );
};

export default App;
