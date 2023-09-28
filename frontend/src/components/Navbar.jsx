import { NavLink } from 'react-router-dom';

function drop(){
    document.getElementById("droppa").classList.toggle("toggla");
}

function dropPlan(){
    document.getElementById("myPlanets").classList.toggle("togglaPlanets");
}

const Navbar = () => {

    return <>
    <div id="nav">
        <NavLink to=""><img src="../src/assets/img/logospace.jpg" alt="" /></NavLink>
        <button onClick={drop} id="dropknapp">
        <div class="hamb1"></div>
        <div class="hamb2"></div>
        <div class="hamb3"></div>
        </button>
        <div id="droppa">
            <div id="navleft">
                <NavLink to="/">HOME</NavLink>
                <NavLink to="/items">ITEMS</NavLink>
                <div class="droppaPlanets">
                    <a onClick={dropPlan} id="planetsID">PLANETS&#8681;</a>
                    <div id="myPlanets" className="contentPlanets">
                        <NavLink to="/planets/mercury">Mercury</NavLink>
                        <NavLink to="/planets/venus">Venus</NavLink>
                        <NavLink to="/planets/tellus">Tellus</NavLink>
                        <NavLink to="/planets/mars">Mars</NavLink>
                        <NavLink to="/planets/jupiter">Jupiter</NavLink>
                        <NavLink to="/planets/saturn">Saturn</NavLink>
                        <NavLink to="/planets/uranus">Uranus (lol)</NavLink>
                        <NavLink to="/planets/neptune">Neptune</NavLink>
                    </div>
                </div>
            </div>
            <div id="navright">
                <NavLink to="">&#9733;</NavLink>
                <NavLink to="">&#9817;</NavLink>
            </div>
        </div>
    </div>
    </>;
};

export default Navbar;
