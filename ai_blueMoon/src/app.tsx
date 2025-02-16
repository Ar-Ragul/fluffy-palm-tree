import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Home from '/Users/ragulraghunath/Desktop/Project/fluffy-palm-tree/ai_blueMoon/src/component/home/home.tsx';
import MultiAgent from '/Users/ragulraghunath/Desktop/Project/fluffy-palm-tree/ai_blueMoon/src/component/multiAgent/multiAgent.tsx';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={<Home />}
                    />
                </Routes>
                <Routes>
                    <Route
                        path="/multiagent"
                        element={<MultiAgent />}
                    />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
