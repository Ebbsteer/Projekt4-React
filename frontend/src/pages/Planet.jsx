import React from "react";
import { useParams } from "react-router-dom";

const planetInfo = [
    {
        name: "Mercury",
        image: "../img/planets/mercury.jpg",
        description:
            "Mercury is the closest planet to the Sun and is known for its extreme temperatures. It has a thin atmosphere and is heavily cratered.",
    },
    {
        name: "Venus",
        image: "../img/planets/venus.jpg",
        description:
            "Venus is often called Earth's twin due to its similar size and composition. It has a thick, toxic atmosphere and a scorching surface temperature.",
    },
    {
        name: "Earth",
        image: "../img/planets/earth.jpg",
        description:
            "Earth is the only known planet with abundant life. It has a diverse climate and is home to a wide variety of ecosystems and species.",
    },
    {
        name: "Mars",
        image: "../img/planets/mars.jpg",
        description:
            "Mars is often called the 'Red Planet' due to its reddish appearance. It has a thin atmosphere and has been a target for robotic exploration.",
    },
    {
        name: "Jupiter",
        image: "../img/planets/jupiter.jpg",
        description:
            "Jupiter is the largest planet in our solar system and is known for its massive size and iconic bands of clouds. It has a strong magnetic field.",
    },
    {
        name: "Saturn",
        image: "../img/planets/saturn.jpg",
        description:
            "Saturn is famous for its stunning ring system, which consists of icy particles. It is a gas giant with a distinct golden hue.",
    },
    {
        name: "Uranus",
        image: "../img/planets/uranus.jpg",
        description:
            "Uranus is a unique planet that rotates on its side, making it appear to roll along its orbital path. It has a blue-green color due to methane in its atmosphere.",
    },
    {
        name: "Neptune",
        image: "../img/planets/neptune.jpg",
        description:
            "Neptune is the farthest known planet from the Sun and is known for its deep blue color. It has strong winds and a dynamic atmosphere.",
    },
    {
        name: "Pluto",
        image: "../img/planets/pluto.jpg",
        description:
            "Pluto is a dwarf planet located in the Kuiper Belt. It was once considered the ninth planet but was reclassified. It has a highly elliptical orbit.",
    },
];

const Planet = () => {
    const { id } = useParams();
    console.log(id);

    const planet = planetInfo.find((p) => p.name.toLowerCase() === id);

    return (
        <>
            <div
                id="planet"
                style={{
                    backgroundImage: `url(${planet.image})`,
                }}
            >
                <div className="planet-box">
                    <div className="box-title">
                        <h1>{planet.name}</h1>
                    </div>

                    <div className="planet-info">
                        <p>
                            {planet.description}Muffin marshmallow lemon drops
                            dessert bonbon pudding sesame snaps croissant wafer.
                            Biscuit lollipop biscuit oat cake bonbon. Cake candy
                            macaroon muffin chocolate bar fruitcake. Cookie
                            pudding bonbon liquorice danish danish. Tart
                            marshmallow gingerbread gummi bears chocolate cake
                            toffee soufflé pudding. Halvah ice cream oat cake
                            shortbread cake fruitcake sweet tootsie roll lemon
                            drops. Liquorice bear claw tart carrot cake icing
                            biscuit macaroon topping. Icing marshmallow cake
                            carrot cake tart. Pudding carrot cake brownie oat
                            cake donut pastry sesame snaps. Donut tiramisu
                            topping bear claw sugar plum sweet roll bear claw
                            chupa chups. Icing biscuit topping sweet carrot cake
                            oat cake. Dessert donut gummies dessert icing sweet
                            dessert cotton candy caramels. Ice cream caramels
                            wafer halvah bear claw. Cookie toffee tootsie roll
                            sweet roll gummi bears cheesecake shortbread sweet
                            roll apple pie. Chocolate bar chocolate bar powder
                            tootsie roll donut chupa chups. Gingerbread powder
                            dessert biscuit sesame snaps soufflé dessert
                            chocolate bar sweet. Gummies liquorice tiramisu
                            danish pudding sweet. Donut wafer donut topping
                            marshmallow. Bonbon icing pastry halvah gummi bears.{" "}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Planet;
