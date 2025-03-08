import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Home from '/Users/ragulraghunath/Desktop/Project/fluffy-palm-tree/ai_blueMoon/src/component/home/home.tsx';
import MultiAgent from '/Users/ragulraghunath/Desktop/Project/fluffy-palm-tree/ai_blueMoon/src/component/multiAgent/multiAgent.tsx';
import {Dashboard} from '/Users/ragulraghunath/Desktop/Project/fluffy-palm-tree/ai_blueMoon/src/component/dashboard/dashboard.tsx';

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
                        path="/ai-office-view"
                        element={<MultiAgent />}
                    />
                </Routes>
                <Routes>
                    <Route
                        path="/single-agent"
                        element={<Dashboard />}
                    />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
