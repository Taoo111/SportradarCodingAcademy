import axios from "axios";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./extraklasa.css";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

export default function Extraklasa(props) {
  const {
    seasonMatches,
    seasons,
    choosedSeason,
    handleSeasonSelect,
  } = props

  const navigate = useNavigate();

  const goRouteId = (id) => {
    navigate(`/match/${id}`);
  };

  const handleColor = (hostsScore, guestScore) => {
    if (
      typeof hostsScore === "undefined" ||
      typeof guestScore === "undefined"
    ) {
      return { hostColor: "primary", guestColor: "primary" };
    } else if (hostsScore > guestScore) {
      return { hostColor: "success", guestColor: "danger" };
    } else if (hostsScore < guestScore) {
      return { hostColor: "danger", guestColor: "success" };
    } else if (hostsScore === guestScore) {
      return { hostColor: "warning", guestColor: "warning" };
    }
  };
  return (
    <div className="extraklasa">
      <h1>Ekstraklasa - sezony</h1>
      <Form.Select
        className="select-season"
        value={choosedSeason}
        onChange={(e) => handleSeasonSelect(e.target.value)}
      >
        {seasons.map((season) => {
          const { id: seasonId, name: seasonName } = season;
          return (
            <option key={seasonId} value={seasonId}>
              {seasonName}
            </option>
          );
        })}
      </Form.Select>
      <Table striped bordered hover>
        <thead>
          <tr className="align-middle">
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
              <tr
                className="tr-table align-middle"
                key={seasonMatch.sport_event.id}
                onClick={() => goRouteId(seasonMatch.sport_event.id)}
              >
                <td
                  className={`bg-${
                    handleColor(home_score, away_score).hostColor
                  } competitor`}
                >
                  {competitors[0].name}
                </td>
                <td>vs</td>
                <td
                  className={`bg-${
                    handleColor(home_score, away_score).guestColor
                  } competitor`}
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
      </Table>
    </div>
  );
}
