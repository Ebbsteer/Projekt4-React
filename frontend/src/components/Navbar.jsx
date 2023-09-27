import {useState} from 'react';

const Navbar = () => {
    const [dropdown, setDropdown] = useState(true);

    return <>
    <div id="nav">
        <button onClick={()=>{setDropdown(!dropdown)}}>Hej</button>
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
