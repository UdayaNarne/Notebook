import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import NoteState from './context/notes/NoteState';
function App() {
  return (
    <div>
      <NoteState>
        <Router>
          <Navbar/>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/about" element={<About/>}/>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;
