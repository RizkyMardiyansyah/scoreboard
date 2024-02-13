import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "../styles/subtituteAdmin.module.css";
import Image from "next/image";

const DropdownComponent = () => {
  const [teamOptions, setTeamOptions] = useState([]);
  const [selectedPlayerIn, setSelectedPlayerIn] = useState("");
  const [selectedPlayerOut, setSelectedPlayerOut] = useState("");
  const [team, setTeam] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_DATABASE_URL}/playerHome`)
      .then((response) => {
        setTeamOptions(response.data);
      });
    axios
      .get(`${process.env.NEXT_PUBLIC_DATABASE_URL}/homeTeam`)
      .then((response) => {
        setTeam(response.data);
      });
    axios
      .get(`${process.env.NEXT_PUBLIC_DATABASE_URL}/awayTeam`)
      .then((response) => {
        setTeamAway(response.data);
      })
      .catch((error) => {
        console.error("Error fetching team dropdown options:", error);
      });
  }, []);

  const handleSelectChange = (e, type) => {
    const selectedValue = e.target.value;

    if (type === "in") {
      setSelectedPlayerIn(selectedValue);
    } else if (type === "out") {
      setSelectedPlayerOut(selectedValue);
    }
    const selectedPlayer = teamOptions.find(
      (player) => player.name === selectedValue
    );

    if (type === "in") {
      const subPhotoUrl = `${process.env.NEXT_PUBLIC_DATABASE_URL}/playerHome/${selectedPlayer._id}/photo`;
      localStorage.setItem("subPhotoUrl", subPhotoUrl);
      localStorage.setItem("subPhotoName", selectedPlayer.name);
      console.log("Selected Player ID:", selectedPlayer._id);
    } else if (type === "out") {
      const subPhotoUrl2 = `${process.env.NEXT_PUBLIC_DATABASE_URL}/playerHome/${selectedPlayer._id}/photo`;
      localStorage.setItem("subPhotoName2", selectedPlayer.name);
      localStorage.setItem("subPhotoUrl2", subPhotoUrl2);
      console.log("Selected Player ID:", selectedPlayer._id);
    }
  };

  const handleExchangePlayers = () => {
    localStorage.setItem("showComponent", "11");

    // Find the IDs of the selected players
    const playerIn = teamOptions.find(
      (player) => player.name === selectedPlayerIn
    );
    const playerOut = teamOptions.find(
      (player) => player.name === selectedPlayerOut
    );

    // Check if both players are found
    if (playerIn && playerOut) {
      // Perform the exchange in the local state
      const updatedTeamOptions = [...teamOptions];
      const playerInIndex = updatedTeamOptions.findIndex(
        (player) => player._id === playerIn._id
      );
      const playerOutIndex = updatedTeamOptions.findIndex(
        (player) => player._id === playerOut._id
      );

      if (playerInIndex !== -1 && playerOutIndex !== -1) {
        // Swap positions
        [
          updatedTeamOptions[playerInIndex],
          updatedTeamOptions[playerOutIndex],
        ] = [
          updatedTeamOptions[playerOutIndex],
          updatedTeamOptions[playerInIndex],
        ];

        // Update the local state
        setTeamOptions(updatedTeamOptions);

        // Update the database
        axios
          .post(`${process.env.NEXT_PUBLIC_DATABASE_URL}/playerHome/swap`, {
            team1Id: playerIn._id,
            team2Id: playerOut._id,
          })
          .then((response) => {
            console.log("Database updated successfully:", response.data);
          })
          .catch((error) => {
            console.error("Error updating database:", error);
          });
      }
    }
  };

  // Conditional rendering based on whether team data is available
  if (!team || !team[0]) {
    return <p>Loading...</p>; // or any other loading indicator
  }

  // At this point, you can safely access team[0].logo
  console.log(team[0].logo);

  return (
    <>
      0
      <div className="flex justify-around">
        <div className="flex flex-col items-center">
          <div className="flex items-center bg-[#f0f0f0]">
            <div className=" p-2 rounded mr-2">
              <Image src={team[0].logo} width={100} height={100} />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center">
                <p className="font-semibold w-24">Team:</p>
                <p>Borneo</p>
              </div>
              <div className="flex items-center">
                <p className="font-semibold w-24">Formation:</p>
                <p>4-3-3</p>
              </div>
              <div className="flex items-center">
                <p className="font-semibold w-24">Coach:</p>
                <p>STY</p>
              </div>
            </div>
          </div>

          <div>
            <h1>Player Out</h1>
            <select
              onChange={(e) => handleSelectChange(e, "in")}
              value={selectedPlayerIn}
            >
              <option value="">Select Player Out</option>
              {teamOptions.slice(0, 11).map((player) => (
                <option key={player._id} value={player.name}>
                  {player.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h1>Player In</h1>
            <select
              onChange={(e) => handleSelectChange(e, "out")}
              value={selectedPlayerOut}
            >
              <option value="">Select Player In</option>
              {teamOptions.slice(11).map((player) => (
                <option key={player._id} value={player.name}>
                  {player.name}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleExchangePlayers}
            className="text-white 
            bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full px-3 py-2 me-2 mt-2 text-sm  bg-blue-500 hover:bg-blue-700"
          >
            Subtitute Players
          </button>

          <div className="mt-auto mb-auto">
            <Image src={team[0].logo} width={200} height={200} />
          </div>
        </div>

        <div className="">
          <h1>Starting Lineup</h1>
          {teamOptions.slice(0, 11).map((player) => (
            <div
              key={player._id}
              className={`${style.playerItem}`}
              tabIndex="0"
            >
              {player.name}
            </div>
          ))}
        </div>

        <div className="">
          <h1>Bench Player</h1>
          {teamOptions.slice(11).map((player) => (
            <div
              key={player._id}
              className={`${style.playerItem}`}
              tabIndex="0"
            >
              {player.name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DropdownComponent;
