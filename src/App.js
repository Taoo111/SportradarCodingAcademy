import Extraklasa from "./components/Extraklasa";
import MatchData from "./components/MatchData";
import PageNotFound from "./PageNotFound";

import "./App.css";
import {  Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


import Button from 'react-bootstrap/Button';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Extraklasa />}></Route>
        <Route path="/match/:id/*" element={<MatchData />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
