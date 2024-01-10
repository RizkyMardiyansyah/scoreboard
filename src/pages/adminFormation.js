import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import styles from "@/pages/adminFormation.module.css";

const YourComponent = () => {
  const [playerHome, setPlayerHome] = useState([]);
  const [playerAway, setPlayerAway] = useState([]);

  useEffect(() => {
    const fetchPlayerHome = async () => {
      try {
        const response = await axios.get("http://localhost:5500/playerHome");
        setPlayerHome(response.data);
      } catch (error) {
        console.error("Error fetching player home:", error);
      }
    };

    fetchPlayerHome();
  }, []);

  useEffect(() => {
    const fetchPlayerAway = async () => {
      try {
        const response = await axios.get("http://localhost:5500/playerAway");
        setPlayerAway(response.data);
      } catch (error) {
        console.error("Error fetching player home:", error);
      }
    };

    fetchPlayerAway();
  }, []);

  const handleInputChange = (e, index) => {
    const updatedPlayerHome = [...playerHome];
    updatedPlayerHome[index].name = e.target.value;
    setPlayerHome(updatedPlayerHome);
  };

  const handleInputChange2 = (e, index) => {
    const updatedPlayerAway = [...playerAway];
    updatedPlayerAway[index].name = e.target.value;
    setPlayerAway(updatedPlayerAway);
  };

  const handleSubmit = async () => {
    try {
      const promises = playerHome.map((player) =>
        axios.put(`http://localhost:5500/playerHome/${player.id}`, player)
      );
      await Promise.all(promises);
      console.log("All players updated successfully!");
    } catch (error) {
      console.error("Error updating players:", error);
    }
  };

  const handleSubmit2 = async () => {
    try {
      const promises = playerAway.map((player) =>
        axios.put(`http://localhost:5500/playerAway/${player.id}`, player)
      );
      await Promise.all(promises);
      console.log("All players updated successfully!");
    } catch (error) {
      console.error("Error updating players:", error);
    }
  };

  const renderForms = () => {
    return playerHome.map((player, index) => (
      <div key={player.id}>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            type="text"
            value={player.name}
            onChange={(e) => handleInputChange(e, index)}
            className="rounded-md border-0 py-1.5 pl-7 pr-20 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    ));
  };

  const renderForms2 = () => {
    return playerAway.map((player, index) => (
      <div key={player.id}>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            type="text"
            value={player.name}
            onChange={(e) => handleInputChange2(e, index)}
            className={`rounded-md border-0 py-1.5 pl-7 pr-20 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          />
        </div>
      </div>
    ));
  };

  return (
    <>
      <Navbar />
      <div className={`${styles.container}`}>
        <div className={`${styles.box1}`}>
          <h2>Player Home</h2>
          {renderForms()}
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          >
            Submit All
          </button>
        </div>

        <div className={`${styles.box2}`}>
          <h2>Player Away</h2>
          {renderForms2()}
          <button
            onClick={handleSubmit2}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          >
            Submit All
          </button>
        </div>
      </div>
    </>
  );
};

export default YourComponent;
