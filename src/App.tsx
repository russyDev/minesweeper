import React from 'react';
import {Route, Routes,} from 'react-router-dom';
import {Game} from "./pages/Game";
import {Settings} from "./pages/Settings";

function App() {
  return (
    <div className="App">
            <Routes>
                <Route path="/" element={<Settings />} />
                <Route path="/game" element={<Game />} />
            </Routes>

    </div>
  );
}

export default App;
