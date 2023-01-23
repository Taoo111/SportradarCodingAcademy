import Extraklasa from "./components/Extraklasa";
import MatchData from "./components/MatchData";
import PageNotFound from "./PageNotFound";

import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const apiVariousSeasons =
  "https://api.sportradar.us/soccer/trial/v4/en/competitions/sr:competition:202/seasons.json?api_key=8bx9u4adp5fztegw84qe238q";

function App() {
  const [seasonMatches, setSeasonMatches] = useState([]);
  const [choosedSeason, setChoosedSeason] = useState("sr:season:77453");
  const [seasons, setSeasons] = useState([]);

  const apiURL = `https://api.sportradar.us/soccer/trial/v4/en/seasons/${choosedSeason}/schedules.json?api_key=8bx9u4adp5fztegw84qe238q`;

  useEffect(() => {
    axios
      .get(apiVariousSeasons)
      .then((res) => {
        setSeasons(res.data.seasons);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(apiURL)
      .then((res) => {
        setSeasonMatches(res.data.schedules);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [choosedSeason]);

  const handleSeasonSelect = (season) => {
    setChoosedSeason(season);
  }
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Extraklasa
              choosedSeason={choosedSeason}
              seasonMatches={seasonMatches}
              seasons={seasons}
              handleSeasonSelect={handleSeasonSelect}
            />
          }
        ></Route>
        <Route path="/match/:id/*" element={<MatchData />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
