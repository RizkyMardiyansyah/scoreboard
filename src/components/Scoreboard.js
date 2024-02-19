"use client";
import { Fragment } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Image from "next/image";
import Timer from "./Timer/timer3";

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
      (_, index) =>
        array.slice(index * chunkSize, index * chunkSize + chunkSize)
    );
  }
  const messagesChunks = chunkArray(score.messagesHome, 5);
  const minutesChunks = chunkArray(score.minutesHome, 5);
  const messagesChunksAway = chunkArray(score.messagesAway, 5);
  const minutesChunksAway = chunkArray(score.minutesAway, 5);
  const stopwatchTime = localStorage.getItem("stopwatchTime");
  return (
    <Fragment>
      <div className="">
        <div className="flex justify-evenly items-center">
          <div className="text-white text-center hometeam ">
            <Image
              src={team.logo}
              width={200}
              height={200}
              alt="Home Team Logo"
            />
            <div>
              <p className="customFont text-xl mt-3">{team.name}</p>
              <p className="text-7xl customFont mt-5 ">{score.home}</p>
            </div>
          </div>

          <div className="text-white text-center mt-auto">
            <p className="text-xl">VS</p>
            {stopwatchTime && parseInt(stopwatchTime) < 2701 ? (
              <p className="mt-5">First Half</p>
            ) : (
              <p className="mt-5">Second Half</p>
            )}
            <Timer />
          </div>

          <div className="text-white text-center awayteam">
            <Image
              src={teamAway.logo}
              width={200}
              height={200}
              alt="Away Team Logo"
            />

            <div>
              <p className="customFont text-xl mt-3"> {teamAway.name} </p>
              <p className="text-7xl customFont mt-5 ">{score.away}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-around py-5 px-5">
        <div className="text-white flex flex-wrap">
          {[
            ...Array(Math.max(messagesChunks.length, minutesChunks.length)),
          ].map((_, rowIndex) => (
            <div key={rowIndex} className="text-xl mt-4 mr-6 ">
              <div className="flex gap-4 min-w-32">
                <div className="w-1/2">
                  {messagesChunks[rowIndex] && messagesChunks[rowIndex][0]}
                </div>
                <div className="w-1/2">
                  {minutesChunks[rowIndex] && minutesChunks[rowIndex][0]}
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  {messagesChunks[rowIndex] && messagesChunks[rowIndex][1]}
                </div>
                <div className="w-1/2">
                  {minutesChunks[rowIndex] && minutesChunks[rowIndex][1]}
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  {messagesChunks[rowIndex] && messagesChunks[rowIndex][2]}
                </div>
                <div className="w-1/2">
                  {minutesChunks[rowIndex] && minutesChunks[rowIndex][2]}
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  {messagesChunks[rowIndex] && messagesChunks[rowIndex][3]}
                </div>
                <div className="w-1/2">
                  {minutesChunks[rowIndex] && minutesChunks[rowIndex][3]}
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  {messagesChunks[rowIndex] && messagesChunks[rowIndex][4]}
                </div>
                <div className="w-1/2">
                  {minutesChunks[rowIndex] && minutesChunks[rowIndex][4]}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="opacity-0">test</div>

        <div className="text-white flex flex-wrap">
          {[
            ...Array(
              Math.max(messagesChunksAway.length, minutesChunksAway.length)
            ),
          ].map((_, rowIndex) => (
            <div key={rowIndex} className="text-xl mt-4 mr-6">
              <div className="flex gap-4 min-w-32">
                <div className="w-1/2">
                  {messagesChunksAway[rowIndex] &&
                    messagesChunksAway[rowIndex][0]}
                </div>
                <div className="w-1/2 ">
                  {minutesChunksAway[rowIndex] &&
                    minutesChunksAway[rowIndex][0]}
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  {messagesChunksAway[rowIndex] &&
                    messagesChunksAway[rowIndex][1]}
                </div>
                <div className="w-1/2">
                  {minutesChunksAway[rowIndex] &&
                    minutesChunksAway[rowIndex][1]}
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  {messagesChunksAway[rowIndex] &&
                    messagesChunksAway[rowIndex][2]}
                </div>
                <div className="w-1/2">
                  {minutesChunksAway[rowIndex] &&
                    minutesChunksAway[rowIndex][2]}
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  {messagesChunksAway[rowIndex] &&
                    messagesChunksAway[rowIndex][3]}
                </div>
                <div className="w-1/2">
                  {minutesChunksAway[rowIndex] &&
                    minutesChunksAway[rowIndex][3]}
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  {messagesChunksAway[rowIndex] &&
                    messagesChunksAway[rowIndex][4]}
                </div>
                <div className="w-1/2">
                  {minutesChunksAway[rowIndex] &&
                    minutesChunksAway[rowIndex][4]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
}
