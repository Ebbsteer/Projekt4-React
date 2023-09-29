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
        <div className="hamb1"></div>
        <div className="hamb2"></div>
        <div className="hamb3"></div>
        </button>
        <div id="droppa">
            <div id="navleft">
                <NavLink to="/">HOME</NavLink>
                <NavLink to="/items">ITEMS</NavLink>
                <div className="droppaPlanets">
                    <a onClick={dropPlan} id="planetsID">PLANETS&#8681;</a>
                    <div id="myPlanets" className="contentPlanets">
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
            <div id="navright">
                <NavLink to="">&#9733;</NavLink>
                <NavLink to="/login">&#9817;</NavLink>
            </div>
        </div>
    </div>
    </>;
};

export default Navbar;
