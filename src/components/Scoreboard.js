"use client";
import { Fragment } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Scoreboard() {
  const [team, setTeam] = useState(null);
  const [teamAway, setTeamAway] = useState(null);
  const [score, setScore] = useState(null);

  const fetchData = async () => {
    try {
      const responseTeam = await axios.get(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/homeTeam`
      );
      setTeam(responseTeam.data[0]);

      const responseTeamAway = await axios.get(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/awayTeam`
      );
      setTeamAway(responseTeamAway.data[0]);

      const responseScore = await axios.get(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/score`
      );
      setScore(responseScore.data[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  if (!team || !teamAway || !score) return null;

  function chunkArray(array, chunkSize) {
    return Array.from(
      { length: Math.ceil(array.length / chunkSize) },
      (v, index) =>
        array.slice(index * chunkSize, index * chunkSize + chunkSize)
    );
  }
  return (
    <Fragment>
      <div className="">
        <div className="flex justify-around">
          <div className="text-white text-center hometeam">
            <Image
              src={team.logo}
              width={200}
              height={200}
              alt="Home Team Logo"
            />
          </div>

          <div className="text-white">
            <p className="text-9xl teamAScore mt-5">{score.home}</p>
          </div>

          <div className="text-white">
            <p className="text-9xl teamAScore mt-4">:</p>
          </div>

          <div className=" text-white">
            <p className="text-9xl teamBScore mt-5">{score.away}</p>
          </div>

          <div className="text-white text-center awayteam">
            <Image
              src={teamAway.logo}
              width={200}
              height={200}
              alt="Away Team Logo"
            />{" "}
          </div>
        </div>
      </div>

      <div className="text-white flex justify-evenly mt-5">
        <div className="text-white flex flex-wrap ">
          {chunkArray(score.messagesHome, 5).map((chunk, colIndex) => (
            <div key={colIndex} className="text-3xl mt-2 mr-5 ml-5">
              {chunk.map((message, rowIndex) => (
                <div key={rowIndex}>{message}</div>
              ))}
            </div>
          ))}
          {chunkArray(score.minutesHome, 5).map((chunk, colIndex) => (
            <div key={colIndex} className="text-3xl mt-2 mr-5 ml-5">
              {chunk.map((message, rowIndex) => (
                <div key={rowIndex}>{message}</div>
              ))}
            </div>
          ))}
        </div>

        <div className="text-white flex flex-wrap ">
          {chunkArray(score.messagesAway, 5).map((chunk, colIndex) => (
            <div key={colIndex} className="text-3xl mt-2 mr-5 ml-5">
              {chunk.map((message, rowIndex) => (
                <div key={rowIndex}>{message}</div>
              ))}
            </div>
          ))}
          {chunkArray(score.minutesAway, 5).map((chunk, colIndex) => (
            <div key={colIndex} className="text-3xl mt-2 mr-5 ml-5">
              {chunk.map((message, rowIndex) => (
                <div key={rowIndex}>{message}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
}
