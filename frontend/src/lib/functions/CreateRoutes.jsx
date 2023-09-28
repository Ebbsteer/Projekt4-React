import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home, ErrorPage, Planet, Items, Login } from "../../pages";
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
                        <Route path="/planet/:id" element={<Planet />} />
                        <Route path="/items" element={<Items />} />
                        <Route path="/Login" element={<Login />} />
                        
                    </Route>
                </Routes>
            </Router>
            <Footer />
        </>
    );
};

export default CreateRoutes;
