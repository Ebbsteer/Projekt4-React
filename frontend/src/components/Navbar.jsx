function drop(){
    document.getElementById("droppa").classList.toggle("toggla");
}

function dropPlan(){
    document.getElementById("myPlanets").classList.toggle("togglaPlanets");
}

const Navbar = () => {

    return <>
    <div id="nav">
        <a href=""><img src="../src/assets/img/logospace.jpg" alt="" /></a>
        <button onClick={drop} id="dropknapp">
        <div class="hamb1"></div>
        <div class="hamb2"></div>
        <div class="hamb3"></div>
        </button>
        <div id="droppa">
            <div id="navleft">
                <a href="">HOME</a>
                <a href="">ITEMS</a>
                <div class="droppaPlanets">
                    <a onClick={dropPlan} id="planetsID">PLANETS&#8681;</a>
                    <div id="myPlanets" className="contentPlanets">
                        <a href="">Mercury</a>
                        <a href="">Venus</a>
                        <a href="">Tellus</a>
                        <a href="">Mars</a>
                        <a href="">Jupiter</a>
                        <a href="">Saturn</a>
                        <a href="">Uranus (lol)</a>
                        <a href="">Neptune</a>
                    </div>
                </div>
            </div>
            <div id="navright">
                <a href="">&#9733;</a>
                <a href="">&#9817;</a>
            </div>
        </div>
    </div>
    </>;
};

export default Navbar;
