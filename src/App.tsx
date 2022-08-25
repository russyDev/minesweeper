import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {Game} from "./pages/Game";
import {Settings} from "./pages/Settings";


function App() {
  return (
    <div className="App">
          <Routes>
            <Route path="/game" element={<Game />} />
            <Route path="/" element={<Settings />} />
          </Routes>
    </div>
  );
}

export default App;
