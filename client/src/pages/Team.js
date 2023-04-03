import React, { useState, useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import TeamDataService from "../services/team.js";
import { useParams } from "react-router-dom";
import "../styles/pages/Team.css";

export function Team() {
  let { id } = useParams();
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [width, setWidth] = useState(window.innerWidth);

  // useEffect(() => {
  //   const updateWindowDimensions = () => {
  //     const newWidth = window.innerWidth;
  //     setWidth(newWidth);
  //   };

  //   window.addEventListener("resize", updateWindowDimensions);
  //   return () => window.removeEventListener("resize", updateWindowDimensions);
  // }, []);

  useEffect(() => {
    TeamDataService.getTeamById(id).then((response) => {
      setTeam(response.data[0]);
      setLoading(false);
    });
  }, [id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      TeamDataService.getTeamById(id).then((response) => {
        setTeam(response.data[0]);
      });
    }, 606000);
    return () => clearTimeout(timer);
  });

  return (
    <Container>
      {loading ? (
        <div className="spinner-buttonMatchs">
          <Spinner animation="border" />
        </div>
      ) : (
        <p>{team.name}</p>
      )}
    </Container>
  );
}
