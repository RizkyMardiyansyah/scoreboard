import React, { useState, useEffect } from "react";
import axios from "axios";

const DropdownComponent = () => {
  const [teamOptions, setTeamOptions] = useState([]);
  const [selectedPlayerIn, setSelectedPlayerIn] = useState("");
  const [selectedPlayerOut, setSelectedPlayerOut] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/playerHome")
      .then((response) => {
        setTeamOptions(response.data);
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
      const subPhotoUrl = `http://localhost:8000/playerHome/${selectedPlayer._id}/photo`;
      localStorage.setItem("subPhotoUrl", subPhotoUrl);
      localStorage.setItem("subPhotoName", selectedPlayer.name);
      console.log("Selected Player ID:", selectedPlayer._id);
    } else if (type === "out") {
      const subPhotoUrl2 = `http://localhost:8000/playerHome/${selectedPlayer._id}/photo`;
      localStorage.setItem("subPhotoName2", selectedPlayer.name);
      localStorage.setItem("subPhotoUrl2", subPhotoUrl2);
      console.log("Selected Player ID:", selectedPlayer._id);
    }
  };

  const handleExchangePlayers = () => {
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
          .post("http://localhost:8000/playerHome/swap", {
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

  return (
    <div>
      <div>
        <h1>Player In</h1>
        <select
          onChange={(e) => handleSelectChange(e, "in")}
          value={selectedPlayerIn}
        >
          <option value="">Select Player In</option>
          {teamOptions.slice(0, 11).map((player) => (
            <option key={player._id} value={player.name}>
              {player.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h1>Player Out</h1>
        <select
          onChange={(e) => handleSelectChange(e, "out")}
          value={selectedPlayerOut}
        >
          <option value="">Select Player Out</option>
          {teamOptions.slice(11).map((player) => (
            <option key={player._id} value={player.name}>
              {player.name}
            </option>
          ))}
        </select>
      </div>

      <button onClick={handleExchangePlayers}>Exchange Players</button>
    </div>
  );
};

export default DropdownComponent;
