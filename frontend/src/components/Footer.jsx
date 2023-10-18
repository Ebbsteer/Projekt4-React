import { NavLink } from "react-router-dom";

function DropPlan_footer() {
  document.getElementById("myPlanets-footer").classList.toggle("togglaPlanets");
}

const Footer = () => {
  window.onclick = function (event1) {
    if (!event1.target.matches("#planetsID")) {
      var dropdowns = document.getElementsByClassName("contentPlanets_footer");
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
            
            <div className="footer-row">

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

              <div className="footer-sitemap">
                <h3>Sitemap</h3>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/items">Items</NavLink>
                <NavLink to="/login">Login/Register</NavLink>
              </div>

              <div className="footer-contact">

                <h3>Contact us</h3>
                    <NavLink to="https://www.linkedin.com/in/ebba-elversson-22a572222/"> Ebba Elversson </NavLink>
                    <NavLink to="https://www.youtube.com/watch?v=dQw4w9WgXcQ"> David </NavLink>
                    <NavLink to="https://www.linkedin.com/in/othman-alani-8133b4251/"> Othman Al-Ani </NavLink>
                    <NavLink to="https://www.linkedin.com/in/salah-al-hassun-132b4b253/"> Salah Al Hassun </NavLink>
                    <NavLink to="https://www.linkedin.com/in/zimon-johnsson-19647723a/"> Zimon Johnsson </NavLink>
                

              </div>

              <div className="footer-img"> 
                <h2 className="logo">CosmicHub</h2>
                <img width={150}  src="/favicon.ico" alt="" />
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
