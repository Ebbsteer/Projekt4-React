function drop(){
    document.getElementById("droppa").classList.toggle("toggla");
}

const Navbar = () => {

    return <>
    <div id="nav">
        <button onClick={drop} id="dropknapp">Hej</button>
        <div id="droppa">
            <div id="navleft">
                <a href=""><img src="../src/assets/img/logospace.jpg" alt="" /></a>
                <a href="">HOME</a>
                <a href="">ITEMS</a>
                <a href="">PLANETS&#8681;</a>
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
