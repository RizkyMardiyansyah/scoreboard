"use client";
import { Fragment } from "react";
import Navbar from "@/components/Navbar";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import SelectHomeTeam from "@/components/SelectHomeTeam";
import SelectAwayTeam from "@/components/SelectAwayTeam";
import styles from "@/pages/adminFormation.module.css";
import YellowPlayer from "@/components/YellowPlayer";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function Admin() {
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(null);
  const [buttons, setButtons] = useState([]);
  const [buttonsAway, setButtonsAway] = useState([]);
  const [playerHome, setPlayerHome] = useState([]);
  const [playerAway, setPlayerAway] = useState([]);
  const [home, setHome] = useState([]);
  const [away, setAway] = useState([]);
  const [showForm1, setShowForm1] = useState(false);
  const [showForm2, setShowForm2] = useState(false);
  const [showForm3, setShowForm3] = useState(false);
  const [showForm1Away, setShowForm1Away] = useState(false);
  const [showForm2Away, setShowForm2Away] = useState(false);
  const [showForm3Away, setShowForm3Away] = useState(false);
  const [showYellowPlayer, setShowYellowPlayer] = useState(false);
  const [showRedPlayer, setShowRedPlayer] = useState(false);
  const [showGoalPlayer, setShowGoalPlayer] = useState(false);
  const [showFormation442Home, setShowFormation442Home] = useState(false);
  const [showFormation4231Home, setShowFormation4231Home] = useState(false);
  const [showFormation433Home, setShowFormation433Home] = useState(false);
  const [showFormation442Away, setShowFormation442Away] = useState(false);
  const [showFormation4231Away, setShowFormation4231Away] = useState(false);
  const [showFormation433Away, setShowFormation433Away] = useState(false);

  useEffect(() => {
    const fetchPlayerHome = async () => {
      try {
        const response = await axios.get("http://localhost:8000/playerHome");
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
        const response = await axios.get("http://localhost:8000/playerAway");
        setPlayerAway(response.data);
      } catch (error) {
        console.error("Error fetching player home:", error);
      }
    };

    fetchPlayerAway();
  }, []);

  React.useEffect(() => {
    axios.get("http://localhost:8000/homeTeam").then((response) => {
      setHome(response.data[0]);
    });
    axios.get("http://localhost:8000/awayTeam").then((response) => {
      setAway(response.data[0]);
    });
    axios.get("http://localhost:8000/team").then((response) => {
      setOptions(response.data);
    });
    axios.get("http://localhost:8000/score").then((response) => {
      setScore(response.data[0]);
    });
    axios.get("http://localhost:8000/playerHome").then((response) => {
      setButtons(response.data);
    });
    axios.get("http://localhost:8000/playerAway").then((response) => {
      setButtonsAway(response.data);
    });
  }, []);
  // if (!team) return null;
  if (!score) return null;
  // console.log(home.name);

  function updateScore() {
    axios
      .put("http://localhost:8000/score/65a4e089ba3ad71beb1ed86f", score)
      .then((response) => {
        Swal.fire({
          title: `Score updated successfully!`,
          icon: "success",
        });
      });
  }

  const toggleComponent1Or3 = () => {
    setShowGoalPlayer(!showGoalPlayer);
    localStorage.getItem("showComponent") === "1"
      ? localStorage.setItem("showComponent", "3")
      : localStorage.setItem("showComponent", "1");
  };
  const toggleComponent1 = () => {
    localStorage.getItem("showComponent") === "1"
      ? localStorage.setItem("showComponent", "1")
      : localStorage.setItem("showComponent", "1");
  };

  const toggleComponent2 = () => {
    localStorage.getItem("showComponent") === "2"
      ? localStorage.removeItem("showComponent")
      : localStorage.setItem("showComponent", "2");
  };
  const toggleComponent4 = () => {
    setShowYellowPlayer(!showYellowPlayer);
    localStorage.getItem("showComponent") === "4"
      ? localStorage.removeItem("showComponent")
      : localStorage.setItem("showComponent", "4");
  };

  const toggleComponent5 = () => {
    setShowRedPlayer(!showRedPlayer);
    localStorage.getItem("showComponent") === "5"
      ? localStorage.removeItem("showComponent")
      : localStorage.setItem("showComponent", "5");
  };

  const toggleComponent6 = () => {
    localStorage.getItem("showComponent") === "6"
      ? localStorage.removeItem("showComponent")
      : localStorage.setItem("showComponent", "6");
  };
  const toggleComponent7 = () => {
    localStorage.getItem("showComponent") === "7"
      ? localStorage.removeItem("showComponent")
      : localStorage.setItem("showComponent", "7");
  };
  const toggleComponent8 = () => {
    localStorage.getItem("showComponent") === "8"
      ? localStorage.removeItem("showComponent")
      : localStorage.setItem("showComponent", "8");
  };
  const toggleComponent9 = () => {
    localStorage.getItem("showComponent") === "9"
      ? localStorage.removeItem("showComponent")
      : localStorage.setItem("showComponent", "9");
  };
  const toggleComponent10 = () => {
    localStorage.getItem("showComponent") === "10"
      ? localStorage.removeItem("showComponent")
      : localStorage.setItem("showComponent", "10");
  };

  const handleSubmit = async () => {
    try {
      const promises = playerHome.map((player) =>
        axios.put(`http://localhost:8000/playerHome/${player._id}`, player)
      );
      await Promise.all(promises);
      Swal.fire({
        title: "All players updated successfully!",
        icon: "success",
      });
      console.log("All players updated successfully!");
    } catch (error) {
      Swal.fire({
        title: `Error updating players ${error}`,
        icon: "error",
      });
      console.error("Error updating players:", error);
    }
  };

  const handleSubmit2 = async () => {
    try {
      const promises = playerAway.map((player) =>
        axios.put(`http://localhost:8000/playerAway/${player._id}`, player)
      );
      await Promise.all(promises);
      // console.log("All players updated successfully!");
      Swal.fire({
        title: "All players updated successfully!",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: error,
        icon: "error",
      });
      console.error("Error updating players:", error);
    }
  };

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
  const renderForms442 = () => {
    return playerHome.map((player, index) => (
      <div key={player._id}>
        {index === 0 ? (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            GK
          </label>
        ) : index === 1 ? (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            DL
          </label>
        ) : index >= 2 && index <= 3 ? (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            DC
          </label>
        ) : index === 4 ? (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            DR
          </label>
        ) : index === 5 ? (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            ML
          </label>
        ) : index >= 6 && index <= 7 ? (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            MC
          </label>
        ) : index === 8 ? (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            MR
          </label>
        ) : index >= 9 && index <= 10 ? (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            ST
          </label>
        ) : (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            Player {index + 1} Name
          </label>
        )}
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
  const renderForms4231 = () => {
    return playerHome.map((player, index) => (
      <div key={player.id}>
        {index === 0 ? (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            GK
          </label>
        ) : index === 1 ? (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            DL
          </label>
        ) : index >= 2 && index <= 3 ? (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            DC
          </label>
        ) : index === 4 ? (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            DR
          </label>
        ) : index >= 5 && index <= 6 ? (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            MC
          </label>
        ) : index === 7 ? (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            AMC
          </label>
        ) : index === 8 ? (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            AMR
          </label>
        ) : index === 9 ? (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            AML
          </label>
        ) : index === 10 ? (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            ST
          </label>
        ) : (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            Player {index + 1} Name
          </label>
        )}
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
  const renderForms433 = () => {
    return playerHome.map((player, index) => (
      <div key={player.id}>
        {index === 0 ? (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            GK
          </label>
        ) : index === 1 ? (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            DL
          </label>
        ) : index >= 2 && index <= 3 ? (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            DC
          </label>
        ) : index === 4 ? (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            DR
          </label>
        ) : index === 5 ? (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            DM
          </label>
        ) : index >= 6 && index <= 7 ? (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            MC
          </label>
        ) : index === 8 ? (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            AMR
          </label>
        ) : index === 9 ? (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            AML
          </label>
        ) : index === 10 ? (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            ST
          </label>
        ) : (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            Player {index + 1} Name
          </label>
        )}
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
  const renderForms442Away = () => {
    return playerAway.map((player, index) => (
      <div key={player.id}>
        {index === 0 ? (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            GK
          </label>
        ) : index === 1 ? (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            DL
          </label>
        ) : index >= 2 && index <= 3 ? (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            DC
          </label>
        ) : index === 4 ? (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            DR
          </label>
        ) : index === 5 ? (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            ML
          </label>
        ) : index >= 6 && index <= 7 ? (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            MC
          </label>
        ) : index === 8 ? (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            MR
          </label>
        ) : index >= 9 && index <= 10 ? (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            ST
          </label>
        ) : (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            Player {index + 1} Name
          </label>
        )}
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            type="text"
            value={player.name}
            onChange={(e) => handleInputChange2(e, index)}
            className="rounded-md border-0 py-1.5 pl-7 pr-20 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    ));
  };
  const renderForms4231Away = () => {
    return playerAway.map((player, index) => (
      <div key={player.id}>
        {index === 0 ? (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            GK
          </label>
        ) : index === 1 ? (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            DL
          </label>
        ) : index >= 2 && index <= 3 ? (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            DC
          </label>
        ) : index === 4 ? (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            DR
          </label>
        ) : index >= 5 && index <= 6 ? (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            MC
          </label>
        ) : index === 7 ? (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            AMC
          </label>
        ) : index === 8 ? (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            AMR
          </label>
        ) : index === 9 ? (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            AML
          </label>
        ) : index === 10 ? (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            ST
          </label>
        ) : (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            Player {index + 1} Name
          </label>
        )}
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            type="text"
            value={player.name}
            onChange={(e) => handleInputChange2(e, index)}
            className="rounded-md border-0 py-1.5 pl-7 pr-20 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    ));
  };
  const renderForms433Away = () => {
    return playerAway.map((player, index) => (
      <div key={player.id}>
        {index === 0 ? (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            GK
          </label>
        ) : index === 1 ? (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            DL
          </label>
        ) : index >= 2 && index <= 3 ? (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            DC
          </label>
        ) : index === 4 ? (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            DR
          </label>
        ) : index === 5 ? (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            DM
          </label>
        ) : index >= 6 && index <= 7 ? (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            MC
          </label>
        ) : index === 8 ? (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            AMR
          </label>
        ) : index === 9 ? (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            AML
          </label>
        ) : index === 10 ? (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            ST
          </label>
        ) : (
          <label
            htmlFor={`playerName${index}`}
            className="block text-sm font-medium text-gray-700"
          >
            Player {index + 1} Name
          </label>
        )}
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            type="text"
            value={player.name}
            onChange={(e) => handleInputChange2(e, index)}
            className="rounded-md border-0 py-1.5 pl-7 pr-20 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    ));
  };
  const handleButtonClick = (formNumber) => {
    setShowFormation4231Home(false);
    setShowFormation442Home(false);
    setShowFormation433Home(false);
    // Toggle the respective form visibility based on the button clicked
    if (formNumber === 1) {
      setShowFormation442Home(true);
      setShowForm1(true);
      setShowForm2(false);
      setShowForm3(false);
    } else if (formNumber === 2) {
      setShowFormation4231Home(true);
      setShowForm1(false);
      setShowForm2(true);
      setShowForm3(false);
    } else if (formNumber === 3) {
      setShowFormation433Home(true);
      setShowForm1(false);
      setShowForm2(false);
      setShowForm3(true);
    }
  };
  const handleButtonClickAway = (formNumber) => {
    setShowFormation4231Away(false);
    setShowFormation442Away(false);
    setShowFormation433Away(false);
    // Toggle the respective form visibility based on the button clicked
    if (formNumber === 1) {
      setShowFormation442Away(true);
      setShowForm1Away(true);
      setShowForm2Away(false);
      setShowForm3Away(false);
    } else if (formNumber === 2) {
      setShowFormation4231Away(true);
      setShowForm1Away(false);
      setShowForm2Away(true);
      setShowForm3Away(false);
    } else if (formNumber === 3) {
      setShowFormation433Away(true);
      setShowForm1Away(false);
      setShowForm2Away(false);
      setShowForm3Away(true);
    }
  };
  return (
    <Fragment>
      <Navbar />

      <div className="bg-slate-300">
        <Tabs>
          <TabList>
            <Tab>Control</Tab>
            <Tab>Team & Score</Tab>
            <Tab>Formation</Tab>
          </TabList>

          <TabPanel className="controlPanel">
            <div className="container flex">
              <div className="flex-auto w-64 ml-10">
                <button
                  onClick={toggleComponent1}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                >
                  Show Scoreboard
                </button>
                <button
                  onClick={toggleComponent1Or3}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                >
                  {showGoalPlayer ? "Hide Player" : "Show Goal Player"}
                </button>

                <button
                  onClick={toggleComponent4}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                >
                  {showYellowPlayer
                    ? "Hide Yellow Player"
                    : "Show Yellow Player"}
                </button>

                <button
                  onClick={toggleComponent5}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                >
                  {showRedPlayer ? "Hide Red Player" : "Show Red Card"}
                </button>
              </div>
              <div className="flex-auto w-32">
                {showFormation4231Home && (
                  <button
                    onClick={toggleComponent7}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                  >
                    Formation 4231 Home
                  </button>
                )}
                {showFormation442Home && (
                  <button
                    onClick={toggleComponent8}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                  >
                    Formation 442 Home
                  </button>
                )}
                {showFormation433Home && (
                  <button
                    onClick={toggleComponent2}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                  >
                    Formation 433 Home
                  </button>
                )}

                {showFormation4231Away && (
                  <button
                    onClick={toggleComponent9}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                  >
                    Formation 4231 Away
                  </button>
                )}
                {showFormation442Away && (
                  <button
                    onClick={toggleComponent10}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                  >
                    Formation 442 Away
                  </button>
                )}
                {showFormation433Away && (
                  <button
                    onClick={toggleComponent6}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                  >
                    Formation 433 Away
                  </button>
                )}
              </div>
            </div>
            {/* <YellowPlayer /> */}
            {showGoalPlayer && <YellowPlayer />}
            {showYellowPlayer && <YellowPlayer />}
            {showRedPlayer && <YellowPlayer />}

            <div className="mt-5 flex items-center justify-center">
              <iframe
                src="http://localhost:3000/"
                title="Content from localhost:3000"
                width="95%"
                height="800"
              />
            </div>
          </TabPanel>
          <TabPanel className="updateTeam&Score">
            <div className="bg-slate-300 flex h-screen">
              <div className="mr-3">
                <SelectHomeTeam />
              </div>
              <div className="mr-3">
                <SelectAwayTeam />
              </div>

              <div className="flex-auto bg-slate-300 ">
                <h1 className="p-2 text-black">Score</h1>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-black"
                >
                  {home.name}
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <input
                    type="text"
                    name="price"
                    id="price"
                    value={score.home}
                    className="rounded-md border-0 py-1.5 pl-7 pr-20 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) =>
                      setScore({ ...score, home: e.target.value })
                    }
                  />
                </div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-black"
                >
                  {away.name}
                </label>
                <div className="relative mt-2 rounded-md shadow-sm">
                  <input
                    type="text"
                    name="price"
                    id="price"
                    value={score.away}
                    className="rounded-md border-0 py-1.5 pl-7 pr-20 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) =>
                      setScore({ ...score, away: e.target.value })
                    }
                  />
                </div>
                <button
                  class="my-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  onClick={updateScore}
                >
                  Update Score
                </button>
              </div>
            </div>
          </TabPanel>
          <TabPanel className="formation">
            <div className={`${styles.container} h-screen`}>
              <div className={`${styles.box1}`}>
                <h2>Player Home</h2>
                <button
                  className="text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2  bg-blue-500 hover:bg-blue-700"
                  onClick={() => handleButtonClick(1)}
                >
                  4-4-2
                </button>
                <button
                  className="text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2  bg-blue-500 hover:bg-blue-700"
                  onClick={() => handleButtonClick(2)}
                >
                  4-2-3-1
                </button>
                <button
                  className="text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2  bg-blue-500 hover:bg-blue-700"
                  onClick={() => handleButtonClick(3)}
                >
                  4-3-3
                </button>

                {showForm1 && renderForms442()}
                {showForm2 && renderForms4231()}
                {showForm3 && renderForms433()}

                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                >
                  Submit
                </button>
              </div>

              <div className={`${styles.box2}`}>
                <h2>Player Away</h2>
                <button
                  className="text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 bg-blue-500 hover:bg-blue-700"
                  onClick={() => handleButtonClickAway(1)}
                >
                  4-4-2
                </button>
                <button
                  className="text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 bg-blue-500 hover:bg-blue-700"
                  onClick={() => handleButtonClickAway(2)}
                >
                  4-2-3-1
                </button>
                <button
                  className="text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 bg-blue-500 hover:bg-blue-700"
                  onClick={() => handleButtonClickAway(3)}
                >
                  4-3-3
                </button>

                {showForm1Away && renderForms442Away()}
                {showForm2Away && renderForms4231Away()}
                {showForm3Away && renderForms433Away()}
                <button
                  onClick={handleSubmit2}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                >
                  Submit
                </button>
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </Fragment>
  );
}
