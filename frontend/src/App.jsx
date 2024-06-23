import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Auth from './components/Auth';
import Detector from './components/Detector';
import Processing from './components/Processing';
import Output from './components/Output';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/detector" element={<Detector />} />
        <Route path="/processing" element={<Processing />} />
        <Route path="/output" element={<Output />} />
      </Routes>
    </Router>
  );
}

export default App;
