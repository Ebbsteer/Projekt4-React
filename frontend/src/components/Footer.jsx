import { NavLink } from 'react-router-dom';

window.onclick = function(event) {
  if (!event.target.matches('#planetsID')) {
    var dropdowns = document.getElementsByClassName("contentPlanets_footer");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('togglaPlanets')) {
        openDropdown.classList.remove('togglaPlanets');
      }
    }
  }
}

function DropPlan_footer(){
  document.getElementById("myPlanets-footer").classList.toggle("togglaPlanets");
}

const Footer = () => {
  return (
    <>
      <div id="foot">
        <div>
          <span className="footer-CO-name">Cosmic<span className='hubStyle'>Hub</span></span>
        </div>

        <div className="footer-content">
          <div className="footer-home">
            <NavLink to="/">HOME</NavLink>
          </div>

          <div className="footer-items">
          <NavLink to="/items">ITEMS</NavLink>
          </div>

          <div className="footer-planets">
            <div className="droppaPlanets">
              <a onClick={DropPlan_footer} id="planetsID">PLANETS &#8680;</a>
                <div id="myPlanets-footer" className="contentPlanets_footer">
                    <NavLink to="/planet/mercury">Mercury</NavLink>
                    <NavLink to="/planet/venus">Venus</NavLink>
                    <NavLink to="/planet/earth">Tellus</NavLink>
                    <NavLink to="/planet/mars">Mars</NavLink>
                    <NavLink to="/planet/jupiter">Jupiter</NavLink>
                    <NavLink to="/planet/saturn">Saturn</NavLink>
                    <NavLink to="/planet/uranus">Uranus (lol)</NavLink>
                    <NavLink to="/planet/neptune">Neptune</NavLink>
                </div>
              </div>
            </div>
        </div>

        <div>
          <p className="footer-CO-copyright">© 2024 CosmicHub - All rights reserved.</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
