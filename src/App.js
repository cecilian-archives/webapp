import React from "react";
import { BrowserRouter } from "react-router-dom";
import CecilianAppBar from "./components/CecilianAppBar";
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
            <RouteMapper routes={routes} defaultRoute="/" />
        </>
    </BrowserRouter>
);

export default App;
