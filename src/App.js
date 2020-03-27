import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";
import CecilianAppBar from "./components/CecilianAppBar";
import CecilianLogosFooter from "./components/CecilianLogosFooter";
import StartPage from "./components/root/StartPage";
import MinutesPage from "./components/root/MinutesPage";

const App = () => (
  <Router>
    <CecilianAppBar />
    <div style={{ flexGrow: "1" }}>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/minutes" element={<MinutesPage />} />
        <Route path="*" element={<Redirect to="/" />} />
      </Routes>
    </div>
    <CecilianLogosFooter />
  </Router>
);

export default App;
