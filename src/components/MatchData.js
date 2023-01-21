import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./matchData.css";
import Table from "react-bootstrap/Table";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function MatchData() {
  // const [showTimeline, setShowTimeline] = useState(false);
  // const [showPlayers, setShowPlayers] = useState(true);

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
    <div className="container my-5">
      {matchData ? (
        <div>
          <h1 className="text-center mb-4">Match Data</h1>
          <h2>Id: {id}</h2>
          <h2>Home: {matchData.sport_event.competitors[0].name}</h2>
          <h2>Away: {matchData.sport_event.competitors[1].name}</h2>
          <h2>Home Score: {matchData.sport_event_status.home_score}</h2>
          <h2>Away Score: {matchData.sport_event_status.away_score}</h2>

          {/* <button onClick={() => setShowTimeline(!showTimeline)}>Show Timeline</button>
          <button on Click={() => {
            setShowPlayers(!showPlayers)
            setShowTimeline(!showTimeline)
          }}>
            Show Players
          </button> */}

          {matchData ? (
            <Row>
              <Col xs lg="3">
                <h5>Home</h5>
                <ListGroup variant="flush">
                  {matchData.timeline.map((event, index) =>
                    event.competitor === "home" ? (
                      <ListGroupItem key={index} className="list-group-item">
                        <strong>{event.match_time}'</strong> {event.type}
                      </ListGroupItem>
                    ) : (
                      <ListGroupItem
                        key={index}
                        className="list-group-item"
                      ></ListGroupItem>
                    )
                  )}
                </ListGroup>
              </Col>
              <Col xs lg="3">
                <h5>Away</h5>
                <ListGroup variant="flush">
                  {matchData.timeline.map((event, index) =>
                    event.competitor === "away" ? (
                      <ListGroupItem key={index}>
                        <strong>{event.match_time}'</strong> - {event.type}
                      </ListGroupItem>
                    ) : (
                      <ListGroupItem key={index}></ListGroupItem>
                    )
                  )}
                </ListGroup>
              </Col>
            </Row>
          ) : (
            <Table bordered responsive="sm" className="players-table">
              <thead className="bg-secondary">
                <tr>
                  <th>Host</th>
                  <th>Guest</th>
                </tr>
              </thead>
              <tbody>
                {matchData.statistics.totals.competitors[0].players.map(
                  (player, index) => {
                    return (
                      <tr key={index} className="bg-light">
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
            </Table>
          )}

          <h2>Timeline</h2>
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}
