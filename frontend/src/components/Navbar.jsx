import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUserAstronaut } from '@fortawesome/free-solid-svg-icons';

window.onclick = function(event) {
    if (!event.target.matches('#planetsID')) {
      var dropdowns = document.getElementsByClassName("contentPlanets");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('togglaPlanets')) {
          openDropdown.classList.remove('togglaPlanets');
        }
      }
    }
}

function Drop(){
    document.getElementById("droppa").classList.toggle("toggla");
}

function DropPlan(){
    document.getElementById("myPlanets").classList.toggle("togglaPlanets");
}

const Navbar = () => {

    return <>
    <div id="nav">
        <NavLink to="" className="navLink">
            <img src="../src/assets/img/logospace.jpg" alt="" />
        </NavLink>

        <button onClick={Drop} id="dropknapp">
            <div className="hamb1"></div>
            <div className="hamb2"></div>
            <div className="hamb3"></div>
        </button>

        <div id="droppa">
            <div id="navleft">
                <NavLink to="/" className="navLink">HOME</NavLink>
                <NavLink to="/items" className="navLink">ITEMS</NavLink>
                <div className="droppaPlanets">
                    <a onClick={DropPlan} id="planetsID" className="navLink">PLANETS&#8681;</a>
                    <div id="myPlanets" className="contentPlanets">
                        <NavLink to="/planet/mercury" className="navLink">Mercury</NavLink>
                        <NavLink to="/planet/venus" className="navLink">Venus</NavLink>
                        <NavLink to="/planet/earth" className="navLink">Tellus</NavLink>
                        <NavLink to="/planet/mars" className="navLink">Mars</NavLink>
                        <NavLink to="/planet/jupiter" className="navLink">Jupiter</NavLink>
                        <NavLink to="/planet/saturn" className="navLink">Saturn</NavLink>
                        <NavLink to="/planet/uranus" className="navLink">Uranus (lol)</NavLink>
                        <NavLink to="/planet/neptune" className="navLink">Neptune</NavLink>
                    </div>
                </div>
            </div>
            
            <div id="navright">
                <NavLink to="/items/fav" className="navLink">&#9733;</NavLink>


                <NavLink to="/login" className="navLink">
                <FontAwesomeIcon icon={faUserAstronaut} />
                </NavLink>

            </div>
        </div>
    </div>
    </>;
};

export default Navbar;
