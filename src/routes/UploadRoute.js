import React from "react";
import RouteMapper from "./RouteMapper";
import StartPage from "../components/root/StartPage";
import MinutesPage from "../components/root/MinutesPage";
import Hold from "../components/root/Hold";

const routes = [
  {
    path: "/minutes",
    render: ({ match }) => <MinutesPage />,
  },
  {
    path: "/photos",
    render: ({ match }) => <Hold />,
  },
  {
    path: "/",
    render: ({ match }) => <StartPage />,
  },
];

const UploadRoute = ({ match }) => (
  <RouteMapper routes={routes} rootPath={match.path} defaultRoute="/" />
);

export default UploadRoute;
