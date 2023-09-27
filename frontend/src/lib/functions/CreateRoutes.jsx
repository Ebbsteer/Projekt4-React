import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home, ErrorPage, Planet, } from "../../pages";
import { Navbar, Footer } from "../../components";

const CreateRoutes = () => {
    return (
        <>
            <Navbar />
            <Router>
                <Routes>
                    <Route path="/">
                        <Route index element={<Home />} />
                        <Route path="*" element={<ErrorPage />} />
                        <Route path="/planet/:mars" element={<Planet />} />
                    </Route>
                </Routes>
            </Router>
            <Footer />
        </>
    );
};

export default CreateRoutes;
