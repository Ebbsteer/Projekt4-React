import React, { useEffect, useState } from "react";
import nebulae from "../assets/img/nebulae.jpeg";


const ErrroPage = () => {
    return <>
        <div id="errorpage">
            <div className="nebulae"></div>

            <div className="content">
                <div className="content-container">
                    <div className="Message">
                        You seem to have traveled <br /> to the wrong side of space.
                    </div>

                    <a href="/">
                        <div className="btn-backtohome">
                            <span>Back To Home</span>
                        </div>
                    </a> 
                </div>
            </div>
        </div>
    </>;
};

export default ErrroPage;
