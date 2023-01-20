import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const apiVariousSeasons =
  "https://api.sportradar.us/soccer/trial/v4/en/competitions/sr:competition:202/seasons.json?api_key=hj3veq9wwk274tx5x66fadtb";

export default function Extraklasa() {
  const [seasonMatches, setSeasonMatches] = useState([]);
  const [choosedSeason, setChoosedSeason] = useState("sr:season:77453");
  const [seasons, setSeasons] = useState([]);

  const apiURL = `https://api.sportradar.us/soccer/trial/v4/en/seasons/${choosedSeason}/schedules.json?api_key=hj3veq9wwk274tx5x66fadtb`;

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

  const handleColor = (hostsScore, guestScore) => {
    if (
      typeof hostsScore === "undefined" ||
      typeof guestScore === "undefined"
    ) {
      return { hostColor: "royalblue", guestColor: "royalblue" };
    } else if (hostsScore > guestScore) {
      return { hostColor: "green", guestColor: "red" };
    } else if (hostsScore < guestScore) {
      return { hostColor: "red", guestColor: "green" };
    } else if (hostsScore === guestScore) {
      return { hostColor: "yellow", guestColor: "yellow" };
    }
  };
  return (
    <div className="extraklasa">
      <h1>Ekstraklasa - sezony</h1>
      <select
        value={choosedSeason}
        onChange={(e) => setChoosedSeason(e.target.value)}
      >
        {seasons.map((season) => {
          const { id: seasonId, name: seasonName } = season;
          return (
            <option key={seasonId} value={seasonId}>
              {seasonName}
            </option>
          );
        })}
      </select>
      <table>
        <thead>
          <tr>
            <th>Host</th>
            <th></th>
            <th>Guest</th>
            <th>Result</th>
            <th>Match Date</th>
            <th>Half Time Score</th>
            <th>Stadium Name</th>
          </tr>
        </thead>
        <tbody>
          {seasonMatches.map((seasonMatch) => {
            const {
              sport_event: {
                competitors,
                start_time,
                venue: { name: stadiumName },
              },
              sport_event_status: { home_score, away_score, period_scores },
            } = seasonMatch;
            return (
              <tr key={seasonMatch.sport_event.id}>
                <td
                  style={{
                    backgroundColor: handleColor(home_score, away_score)
                      .hostColor,
                  }}
                >
                  <Link to={`/match/${seasonMatch.sport_event.id}`}>
                    {competitors[0].name}
                  </Link>
                </td>
                <td>vs</td>
                <td
                  style={{
                    backgroundColor: handleColor(home_score, away_score)
                      .guestColor,
                  }}
                >
                  {competitors[1].name}
                </td>
                <td>
                  {home_score} : {away_score}
                </td>
                <td>{start_time.slice(0, 10)}</td>
                {period_scores ? (
                  <td>
                    {period_scores[0].home_score} -{" "}
                    {period_scores[0].away_score}
                  </td>
                ) : (
                  <td>Match Postponed</td>
                )}
                <td>{stadiumName}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
