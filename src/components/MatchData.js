import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";


export default function MatchData() {
  const { id } = useParams();
  const matchInfoApi = `https://api.sportradar.us/soccer/trial/v4/en/sport_events/${id}/timeline.json?api_key=hj3veq9wwk274tx5x66fadtb`;
  const [matchData, setMatchData] = useState(null);

  useEffect(() => {
    axios
      .get(matchInfoApi)
      .then((res) => {
        setMatchData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(matchData);

  return (
    <div>
      {matchData ? (
        <div>
          <h1>Match Data</h1>
          <h2>Id: {id}</h2>
          <h2>Home: {matchData.sport_event.competitors[0].name}</h2>
          <h2>Away: {matchData.sport_event.competitors[1].name}</h2>
          <h2>Home Score: {matchData.sport_event_status.home_score}</h2>
          <h2>Away Score: {matchData.sport_event_status.away_score}</h2>

          <table>
            <thead>
              <tr>
                <th>Host</th>
                <th>Guest</th>
              </tr>
            </thead>
            <tbody>
              {matchData.statistics.totals.competitors[0].players.map(
                (player, index) => {
                  return (
                    <tr key={index}>
                      <td>{player.name}</td>
                      <td>
                        {
                          matchData.statistics.totals.competitors[1].players[
                            index
                          ].name
                        }
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>

          <h2>Timeline</h2>
          <ul>
            {matchData.timeline.map((event, index) => (
              <li key={index}>
                <strong>{event.match_time}'</strong> - {event.type} -{" "}
                {event.competitor}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}
