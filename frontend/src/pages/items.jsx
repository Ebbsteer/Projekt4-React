import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faEarthAmericas } from "@fortawesome/free-solid-svg-icons";
import { faEarthAsia } from "@fortawesome/free-solid-svg-icons";
import { faMeteor } from "@fortawesome/free-solid-svg-icons";
import { faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";

const Items = () => {
    const cookieName = "cid";

    const allCookies = document.cookie;

    const exponent2 = "\u00B2";

    const itemList = "https://api.le-systeme-solaire.net/rest/bodies/";

    const [activeButtons, setActiveButtons] = useState([]);

    const [planets, setPlanets] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc");
    const [sortOrderDate, setSortOrderDate] = useState("asc");
    const [sortOrderType, setSortOrderType] = useState("asc");

    const [filterType, setFilterType] = useState("all"); // Default to "all"
    const [showFavorites, setShowFavorites] = useState(false);

    const handleButtonClick = (planetId, shouldRemove) => {
        const action = shouldRemove ? "remove" : "add";
        if(allCookies.includes(`${cookieName}=`)){
        fetch(`http://localhost:3000/favorite/${action}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ fid: planetId }),
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);

                if (response !== null) setActiveButtons(response);
            })
            .catch((error) => {
                console.error("Fetch error:", error);
                alert("Please log in to perform this action!");
            });
        }
        else{
            alert("Please log in to perform this action!");
        }
    };

    const { id } = useParams();

    useEffect(() => {
        if(allCookies.includes(`${cookieName}=`)){
        fetch("http://localhost:3000/favorite/list", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                setActiveButtons(response.favorites);
            })
            .catch((error) => {
                console.error("Fetch error:", error);

            });

        if (id === "fav") {
            setShowFavorites(true);
        }
    }
    }, []);

    const sortlistName = () => {
        const newSortOrder = sortOrder === "desc" ? "asc" : "desc";
        setSortOrder(newSortOrder);

        // Sort the searchResults array based on the sorting order
        const sortedResults = [...searchResults].sort((a, b) => {
            const nameA = a.englishName.toLowerCase();
            const nameB = b.englishName.toLowerCase();

            if (newSortOrder === "asc") {
                return nameA.localeCompare(nameB);
            } else {
                return nameB.localeCompare(nameA);
            }
        });

        setSearchResults(sortedResults);
    };

    const sortlistDate = () => {
        // Toggle sorting order for Date column
        const newSortOrder = sortOrderDate === "desc" ? "asc" : "desc";
        setSortOrderDate(newSortOrder);

        const sortedResults = [...searchResults].sort((a, b) => {
            const dateA = new Date(parseDate(a.discoveryDate)).getTime();
            const dateB = new Date(parseDate(b.discoveryDate)).getTime();

            if (newSortOrder === "asc") {
                return dateA - dateB;
            } else {
                return dateB - dateA;
            }
        });

        setSearchResults(sortedResults);
    };

    const sortlistType = () => {
        // Toggle sorting order for Type column
        const newSortOrder = sortOrderType === "desc" ? "asc" : "desc";
        setSortOrderType(newSortOrder);

        const sortedResults = [...searchResults].sort((a, b) => {
            const typeA = a.bodyType.toLowerCase();
            const typeB = b.bodyType.toLowerCase();

            if (newSortOrder === "asc") {
                return typeA.localeCompare(typeB);
            } else {
                return typeB.localeCompare(typeA);
            }
        });

        setSearchResults(sortedResults);
    };

    const handleTypeFilterChange = (e) => {
        setFilterType(e.target.value);
    };

    const handleFavoritesFilterChange = () => {
        setShowFavorites(!showFavorites);
    };

    const filteredResults = searchResults.filter((planet) => {
        const isFavorite = activeButtons.indexOf(planet.id);
        if (showFavorites && isFavorite === -1) {
            return false;
        }
        if (
            filterType === "all" ||
            planet.bodyType.toLowerCase() === filterType
        ) {
            return true;
        }
        return false;
    });

    const fetchUserData = () => {
        fetch(itemList)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setPlanets(data.bodies);
            })
            .catch((error) => {
                console.error("Fetch error:", error);
            });
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    useEffect(() => {
        const filteredData = planets.filter((item) =>
            item.englishName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(filteredData);
    }, [planets, searchTerm]);

    const parseDate = (dateString) => {
        const parts = dateString.split("/");
        if (parts.length === 3) {
            const [day, month, year] = parts;
            return `${year}-${month}-${day}`;
        } else {
            // Return a default date if the input format is not as expected
            return "1970-01-01"; // You can choose any default date you prefer
        }
    };

    return (
        <div id="home">
            <div className="nebulae"></div>
            <div className="tabellDiv">
                <div className="filter">
                                <input
                                    className="search"
                                    type="text"
                                    placeholder="Sök..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                />
                            

                            
                                <span className="filter-span">Filter:</span>
                                <select
                                    className="select-type"
                                    value={filterType}
                                    onChange={handleTypeFilterChange}
                                >
                                    <option value="all">All Types</option>
                                    <option value="star">Star</option>
                                    <option value="planet">Planets</option>
                                    <option value="moon">Moons</option>
                                    <option value="dwarf planet">
                                        Dwarf planets
                                    </option>
                                    <option value="asteroid">Asteroids</option>
                                    <option value="comet">Comets</option>
                                </select>
                            

                            
                                <label className="fav-type">
                                    <input
                                        type="checkbox"
                                        checked={showFavorites}
                                        onChange={handleFavoritesFilterChange}
                                    />
                                    Show Favorites
                                </label>
                    </div>
                <table className="itemtable">
                    <thead>
                        <tr>
                            <th className="item-table-title-favo"></th>
                            <th className="item-table-title-nr">Nr</th>
                            <th
                                onClick={sortlistType}
                                className="item-table-title-type"
                            >
                                Type {sortOrderType === "asc" ? "▼" : "▲"}{" "}
                            </th>
                            <th
                                onClick={sortlistName}
                                className="item-table-title-name"
                            >
                                Name {sortOrder === "asc" ? "▼" : "▲"}
                            </th>
                            <th className="item-table-title-temp">Temp - °C</th>
                            <th className="item-table-title-grav">
                                Gravity m/s{exponent2}
                            </th>
                            <th
                                onClick={sortlistDate}
                                className="item-table-title-disc"
                            >
                                Discovered {sortOrderDate === "asc" ? "▼" : "▲"}{" "}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredResults.length === 0 ? (
                            <tr>
                                <td colSpan="5">No matching cosmic body</td>
                            </tr>
                        ) : (
                            filteredResults.map((planet, i) => (
                                <tr key={planet.id}>
                                    <td className="item-table-info-favo">
                                        <button
                                            id="favoriteButton"
                                            className={
                                                activeButtons.indexOf(
                                                    planet.id
                                                ) !== -1
                                                    ? "makeFavorite"
                                                    : ""
                                            }
                                            onClick={() =>
                                                handleButtonClick(
                                                    planet.id,
                                                    activeButtons.indexOf(
                                                        planet.id
                                                    ) !== -1
                                                )
                                            }
                                        >
                                            <p id="btnContent">&#9733;</p>
                                        </button>
                                    </td>
                                    <td className="item-table-info-nr">{i}</td>
                                    <td className="item-table-info-type">
                                        {planet.bodyType} &nbsp;
                                        {planet.bodyType === "Moon" ? (
                                            <FontAwesomeIcon icon={faMoon} />
                                        ) : (
                                            ""
                                        )}
                                        {planet.bodyType === "Planet" ? (
                                            <FontAwesomeIcon
                                                icon={faEarthAmericas}
                                            />
                                        ) : (
                                            ""
                                        )}
                                        {planet.bodyType === "Asteroid" ? (
                                            <FontAwesomeIcon icon={faMeteor} />
                                        ) : (
                                            ""
                                        )}
                                        {planet.bodyType === "Comet" ? (
                                            <FontAwesomeIcon icon={faMeteor} />
                                        ) : (
                                            ""
                                        )}
                                        {planet.bodyType === "Star" ? (
                                            <FontAwesomeIcon
                                                icon={faStarHalfStroke}
                                            />
                                        ) : (
                                            ""
                                        )}
                                        {planet.bodyType === "Dwarf Planet" ? (
                                            <FontAwesomeIcon
                                                icon={faEarthAsia}
                                            />
                                        ) : (
                                            ""
                                        )}
                                    </td>
                                    <td className="item-table-info-name">
                                        {planet.englishName}
                                    </td>
                                    <td className="item-table-info-temp">
                                        {planet.avgTemp - 273} °C
                                    </td>
                                    <td className="item-table-info-grav">
                                        {planet.gravity}m/s{exponent2}
                                    </td>
                                    <td className="item-table-info-disc">
                                        {planet.discoveryDate}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Items;
