import {
    BrowserRouter as Router,
    Routes,
    Route,
    Outlet,
} from "react-router-dom";

import {
    Home,
    ErrorPage,
    Planet,
    Items,
    Login,
    Exempel,
    Profil,
} from "../../pages";
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
                        <Route path="/items/:id?" element={<Items />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/exempel" element={<Exempel />} />
                        <Route path="/profil" element={<Profil />} />
                    </Route>
                </Routes>
            </Router>
        </>
    );
};

export default CreateRoutes;
