"use client";
import { Fragment } from "react";
import Timer from "../components/test/timer3";
import axios from "axios";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Scoreboard() {
  const [team, setTeam] = useState(null);
  const [teamAway, setTeamAway] = useState(null);
  const [score, setScore] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8000/homeTeam").then((response) => {
      setTeam(response.data[0]);
    });
    axios.get("http://localhost:8000/awayTeam").then((response) => {
      setTeamAway(response.data[0]);
    });
    axios.get("http://localhost:8000/score").then((response) => {
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
      <div className="border border-slate-900 mt-10 p-4 rounded-md bg-[#2f2f2f] ">
        <div class="flex justify-around mt-10">
          <div className="text-white text-center">
            <Image src={team.logo} width={200} height={200} />
            {team.name}
          </div>
          <div className="text-white">
            <div className="text-white">
              <Image
                src="https://i.ibb.co/n7XgrJd/BRI-Liga-1-Indonesia.png"
                width={200}
                height={200}
              />
            </div>
          </div>
          <div className="text-white text-center mt-5">
            <Image src={teamAway.logo} width={200} height={200} />{" "}
            {teamAway.name}
          </div>
        </div>

        <div class="flex justify-around mt-8">
          <div className="text-6xl text-white text-center">
            <p className="teamAScore ml-8">{score.home}</p>
          </div>
          <div className="text-white">
            <Timer />
          </div>
          <div className="text-6xl text-white">
            <p className="teamBScore mr-10">{score.away}</p>
          </div>
        </div>
      </div>

      <div className="text-center absolute bottom-0 w-full mb-4 text-white">
        <div className="text-center">
          <p>AFC Asian Cup</p>
        </div>
      </div>
    </Fragment>
  );
}
