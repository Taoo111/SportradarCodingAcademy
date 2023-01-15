import axios from "axios";
import { useState, useEffect } from "react";

const apiURL =
  "https://cors-anywhere.herokuapp.com/https://api.sportradar.us/soccer/trial/v4/en/seasons/sr:season:77453/schedules.json?api_key=hj3veq9wwk274tx5x66fadtb";

export default function Extraklasa() {
  const [seasonMatches, setSeasonMatches] = useState([]);

  useEffect(() => {
    axios
      .get(apiURL)
      .then((res) => {
        console.log(res.data.schedules);
        setSeasonMatches(res.data.schedules);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="extraklasa">
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
              sport_event: { competitors, start_time, venue: {name: stadiumName} },
              sport_event_status: { home_score, away_score, period_scores },
            } = seasonMatch;
            return (
              <tr key={seasonMatch.sport_event.id}>
                <td>{competitors[0].name}</td>
                <td>vs</td>
                <td>{competitors[1].name}</td>
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
