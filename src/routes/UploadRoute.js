import React from "react";
import Hold from "../components/root/Hold";
import RouteMapper from "./RouteMapper";

const routes = [
    {
        path: "/start",
        render: ({ match }) => <Hold />,
    },
];

const UploadRoute = ({ match }) => <RouteMapper routes={routes} rootPath={match.path} defaultRoute="/start" />;

export default UploadRoute;
