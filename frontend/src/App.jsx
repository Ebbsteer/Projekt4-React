import React, { useState, useEffect } from "react";
import { CreateRoutes } from "./lib";

function App() {
    const [a, setA] = useState(null);
    useEffect(() => {
        if (a === null) setA(<CreateRoutes />);
    });

    return <>{a}</>;
}

export default App;
