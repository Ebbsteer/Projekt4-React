import {
    BrowserRouter as Router,
    Routes,
    Route,
    Outlet,
} from "react-router-dom";

import { Home, ErrorPage, Planet, Items, Login, Exempel } from "../../pages";
import { Navbar, Footer } from "../../components";

const OutletTest = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
};

const CreateRoutes = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<OutletTest />}>
                        <Route index element={<Home />} />
                        <Route path="*" element={<ErrorPage />} />
                        <Route path="/planet/:id" element={<Planet />} />
                        <Route path="/items" element={<Items />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/exempel" element={<Exempel />} />
                    </Route>
                </Routes>
            </Router>
        </>
    );
};

export default CreateRoutes;
