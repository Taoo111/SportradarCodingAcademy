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
            <th>Team Names</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {seasonMatches.map((seasonMatch) => {
            const {
              sport_event: { competitors },
              sport_event_status: { home_score, away_score },
            } = seasonMatch;
            return (
              <tr key={seasonMatch.sport_event.id}>
                <td>
                  {competitors[0].name} vs {competitors[1].name}
                </td>
                <td>
                  {home_score} : {away_score}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
