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

  const fetchData = async () => {
    try {
      const responseTeam = await axios.get("http://localhost:8000/homeTeam");
      setTeam(responseTeam.data[0]);

      const responseTeamAway = await axios.get(
        "http://localhost:8000/awayTeam"
      );
      setTeamAway(responseTeamAway.data[0]);

      const responseScore = await axios.get("http://localhost:8000/score");
      setScore(responseScore.data[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data initially

    // Set up an interval to fetch data periodically (adjust the interval as needed)
    const intervalId = setInterval(fetchData, 5000); // Fetch every 5 seconds

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // The empty dependency array ensures that this effect runs only once on mount

  if (!team || !teamAway || !score) return null;

  console.log(team);
  const currentDate = new Date();

  // Get individual date components
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Month is zero-based
  const day = currentDate.getDate();
  return (
    <Fragment>
      {/* <div className="">
        <div class="flex justify-around">
          <div className="text-white text-center hometeam">
            <Image src={team.logo} width={200} height={200} />
            {team.name}
          </div>

          <div className="text-white bri">
            <div className="text-white">
              <Image
                src="https://i.ibb.co/n7XgrJd/BRI-Liga-1-Indonesia.png"
                width={200}
                height={200}
              />
            </div>
          </div>

          <div className="text-white text-center awayteam">
            <Image src={teamAway.logo} width={200} height={200} />{" "}
            {teamAway.name}
          </div>
        </div>

        <div class="flex justify-around ">
          <div className="text-6xl text-white text-center">
            <p className="teamAScore mt-5">{score.home}</p>
          </div>
          <div className="text-white"></div>
          <div className="text-6xl text-white">
            <p className="teamBScore mt-5">{score.away}</p>
          </div>
        </div>
      </div> */}

      <div className="">
        <div class="flex justify-around">
          <div className="text-white text-center hometeam">
            <Image src={team.logo} width={200} height={200} />
          </div>

          <div className="text-9xl text-white text-center">
            <p className="teamAScore mt-5">{score.home}</p>
          </div>

          <div className="text-9xl text-white text-center">
            <p className="teamAScore mt-5">:</p>
          </div>

          <div className="text-9xl text-white">
            <p className="teamBScore mt-5">{score.away}</p>
          </div>

          <div className="text-white text-center awayteam">
            <Image src={teamAway.logo} width={200} height={200} />{" "}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
