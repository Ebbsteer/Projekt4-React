import { NavLink } from "react-router-dom";

function DropPlan_footer() {
    document
        .getElementById("myPlanets-footer")
        .classList.toggle("togglaPlanets");
}

const Footer = () => {
    window.onclick = function (event1) {
        if (!event1.target.matches("#planetsID")) {
            var dropdowns = document.getElementsByClassName(
                "contentPlanets_footer"
            );
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains("togglaPlanets")) {
                    openDropdown.classList.remove("togglaPlanets");
                }
            }
        }
    };

    return (
        <>
            <footer id="footer">
                <div className="inner">
                    <div className="footer-content">
                        <h2 className="logo">CosmicHub</h2>
                        <div>
                            <div>
                                <h3>Sitemap</h3>
                                <NavLink to="/">Home</NavLink>
                                <NavLink to="/items">Items</NavLink>
                                <NavLink to="/login">Login/Register</NavLink>
                            </div>

                            <div className="footer-planets">
                                <h3>Planets</h3>
                                <NavLink to="/planet/mercury">Mercury</NavLink>
                                <NavLink to="/planet/venus">Venus</NavLink>
                                <NavLink to="/planet/earth">Tellus</NavLink>
                                <NavLink to="/planet/mars">Mars</NavLink>
                                <NavLink to="/planet/jupiter">Jupiter</NavLink>
                                <NavLink to="/planet/saturn">Saturn</NavLink>
                                <NavLink to="/planet/uranus">Uranus</NavLink>
                                <NavLink to="/planet/neptune">Neptune</NavLink>
                            </div>
                        </div>
                    </div>

                    <div className="copyright-container">
                        <p>© 2024 CosmicHub - All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
