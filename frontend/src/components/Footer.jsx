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
            <div id="foot">
                <div>
                    <span className="footer-CO-name">
                        Cosmic<span className="hubStyle">Hub</span>
                    </span>
                </div>

                <div className="footer-content">
                    <div className="footer-home">
                        <NavLink to="/" className="navLink">
                            HOME
                        </NavLink>
                    </div>

                    <div className="footer-items">
                        <NavLink to="/items" className="navLink">
                            ITEMS
                        </NavLink>
                    </div>

                    <div className="footer-planets">
                        <div className="droppaPlanets">
                            <a
                                onClick={DropPlan_footer}
                                id="planetsID"
                                className="navLink"
                            >
                                PLANETS &#8680;
                            </a>
                            <div
                                id="myPlanets-footer"
                                className="contentPlanets_footer"
                            >
                                <NavLink
                                    to="/planet/mercury"
                                    className="navLink"
                                >
                                    Mercury
                                </NavLink>
                                <NavLink to="/planet/venus" className="navLink">
                                    Venus
                                </NavLink>
                                <NavLink to="/planet/earth" className="navLink">
                                    Tellus
                                </NavLink>
                                <NavLink to="/planet/mars" className="navLink">
                                    Mars
                                </NavLink>
                                <NavLink
                                    to="/planet/jupiter"
                                    className="navLink"
                                >
                                    Jupiter
                                </NavLink>
                                <NavLink
                                    to="/planet/saturn"
                                    className="navLink"
                                >
                                    Saturn
                                </NavLink>
                                <NavLink
                                    to="/planet/uranus"
                                    className="navLink"
                                >
                                    Uranus (lol)
                                </NavLink>
                                <NavLink
                                    to="/planet/neptune"
                                    className="navLink"
                                >
                                    Neptune
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <p className="footer-CO-copyright">
                        © 2024 CosmicHub - All rights reserved.
                    </p>
                </div>
            </div>
        </>
    );
};

export default Footer;
