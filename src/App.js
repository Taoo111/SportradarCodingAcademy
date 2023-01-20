import Extraklasa from "./components/Extraklasa";
import MatchData from "./components/MatchData";

import "./App.css";
import {  Routes, Route } from "react-router-dom";



function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<Extraklasa />}></Route>
        <Route path="/match/:id/*" element={<MatchData />} />
      </Routes>
    </div>
  );
}

export default App;
