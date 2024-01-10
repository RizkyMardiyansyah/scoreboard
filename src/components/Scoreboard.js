"use client";
import { Fragment } from "react";
import Timer from "./Timer";
import axios from "axios";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Scoreboard() {
  const [team, setTeam] = useState(null);
  const [teamAway, setTeamAway] = useState(null);
  const [score, setScore] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5500/home/1").then((response) => {
      setTeam(response.data[0]);
    });
    axios.get("http://localhost:5500/away/1").then((response) => {
      setTeamAway(response.data[0]);
    });
    axios.get("http://localhost:5500/score").then((response) => {
      setScore(response.data[0]);
    });
  }, []);
  if (!team) return null;
  if (!teamAway) return null;
  if (!score) return null;

  console.log(team);
  const currentDate = new Date();

  // Get individual date components
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Month is zero-based
  const day = currentDate.getDate();
  return (
    <Fragment>
      <div className="flex items-center justify-center mt-10">
        <p className="text-white text-3xl">Date: {`${day}/${month}/${year}`}</p>
      </div>
      <div class="scoreboard">
        <div class="team">
          <div>
            <Image src={team.logo} width={512} height={512} />
          </div>
          {/* <h2>{team.name}</h2> */}
          <p id="teamAScore">{score.home}</p>
        </div>

        <Timer />

        <div class="teamb">
          <div>
            <Image src={teamAway.logo} width={512} height={512} />
          </div>
          {/* <h2>{teamAway.name}</h2> */}
          <p id="teamBScore">{score.away}</p>
        </div>
      </div>
    </Fragment>
  );
}
