import React from "react";
import { BrowserRouter } from "react-router-dom";
import CecilianAppBar from "./components/CecilianAppBar";
import CecilianLogosFooter from "./components/CecilianLogosFooter";
import RouteMapper from "./routes/RouteMapper";
import UploadRoute from "./routes/UploadRoute";

const routes = [
  {
    path: "/",
    render: ({ match }) => <UploadRoute match={match} />,
  },
];

const App = () => (
  <BrowserRouter>
    <>
      <CecilianAppBar />
      <div style={{ flexGrow: "1" }}>
        <RouteMapper routes={routes} defaultRoute="/" />
      </div>
      <CecilianLogosFooter />
    </>
  </BrowserRouter>
);

export default App;
