import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./matchData.css";
import Table from "react-bootstrap/Table";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function MatchData() {
  const [showTimeline, setShowTimeline] = useState(false);
  const [showPlayers, setShowPlayers] = useState(true);

  const { id } = useParams();
  const matchInfoApi = `https://api.sportradar.us/soccer/trial/v4/en/sport_events/${id}/timeline.json?api_key=8bx9u4adp5fztegw84qe238q`;
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

  useEffect(() => {
    document.body.style.backgroundColor = "#1b3d64";
    return () => {
      document.body.style.backgroundColor = "#fff";
    };
  }, []);

  console.log(matchData);

  return (
    <div className="container my-5">
      {matchData ? (
        <div>
          <header className="d-flex flex-row justify-content-around display-6 text-white">
            <div className="d-flex flex-column align-items-center mw-40">
              <p>{matchData.sport_event.competitors[0].name}</p>
              <p>{matchData.sport_event_status.home_score}</p>
            </div>
            <div className="d-flex flex-column align-items-center mw-40">
              <p>{matchData.sport_event.competitors[1].name}</p>
              <p>{matchData.sport_event_status.away_score}</p>
            </div>
          </header>

          <div className="d-flex justify-content-center m-4">
            <button type="button" class="btn btn-lg btn-outline-warning"
              onClick={() => {
                setShowTimeline(false);
                setShowPlayers(true);
              }}
            >
              Show Players
            </button>
            <button type="button" class="btn btn-lg btn-outline-warning"
              onClick={() => {
                setShowTimeline(true);
                setShowPlayers(false);
              }}
            >
              Show Players
            </button>
          </div>

          {showTimeline && (
            <Container fluid>
              <Row className="justify-content-center">
                <Col xs lg="3">
                  <ListGroup variant="flush">
                    {matchData.timeline.slice(2).map((event, index) =>
                      event.competitor === "home" ? (
                        <ListGroupItem key={index} className="list-group-item">
                          <strong>{event.match_time}'</strong>{" "}
                          {event.type.replace("_", " ")}
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
                  <ListGroup variant="flush">
                    {matchData.timeline.slice(2).map((event, index) =>
                      event.competitor === "away" ? (
                        <ListGroupItem key={index}>
                          <strong>{event.match_time}'</strong>
                          {event.type.replace("_", " ")}
                        </ListGroupItem>
                      ) : (
                        <ListGroupItem key={index}></ListGroupItem>
                      )
                    )}
                  </ListGroup>
                </Col>
              </Row>
            </Container>
          )}

          {showPlayers && (
            <Table bordered responsive="sm" className="players-table mx-auto">
              <thead className="bg-secondary">
                <tr>
                  <th>{matchData.sport_event.competitors[0].name}</th>
                  <th>{matchData.sport_event.competitors[1].name}</th>
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
        </div>
      ) : (
        <p className="d-flex justify-content-around display-3 text-white">Loading data...</p>
      )}
    </div>
  );
}
