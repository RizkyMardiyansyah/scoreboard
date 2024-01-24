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
import TimerButton from "@/components/test/timerButton";
import withAuth from "../components/withAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import DropdownButton from "../components/Dropdown";
import Image from "next/image";

// const Admin = () =>{

// }
const Admin = (isAuthenticated) => {
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(null);
  const [buttons, setButtons] = useState([]);
  const [buttonsAway, setButtonsAway] = useState([]);
  const [playerHome, setPlayerHome] = useState([]);
  const [playerAway, setPlayerAway] = useState([]);
  const [playerNumber, setPlayerNumber] = useState([]);
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
  const [selectedFormation, setSelectedFormation] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/coach");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
    // Show SweetAlert confirmation popup
    const result = await Swal.fire({
      title: "Update All Players?",
      text: "Are you sure you want to update all players?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, update all players",
      cancelButtonText: "No, cancel",
    });

    if (result.isConfirmed) {
      try {
        const promises = playerHome.map(({ _id, name, no }) =>
          axios.put(`http://localhost:8000/playerHome/${_id}`, { name, no })
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

  const handleSubmitCoach = async (e) => {
    e.preventDefault();

    try {
      // Assuming data[0].id exists in your coach data
      const coachId = data[0]._id;

      const updatedData = {
        name: data.name,
      };

      // Make the PUT request to update the coach name
      await axios.put(`http://localhost:8000/coach/${coachId}`, updatedData);

      // Fetch the latest data after the update
      const response = await axios.get("http://localhost:8000/coach");
      setData(response.data);

      console.log("Coach data saved successfully!");
    } catch (error) {
      console.error("Error saving coach data:", error);
    }
  };

  const handleInputChange = (e, index) => {
    const updatedPlayerHome = [...playerHome];
    updatedPlayerHome[index].name = e.target.value;
    setPlayerHome(updatedPlayerHome);
  };

  const handleNumberChange = (e, index) => {
    const updatedPlayerHome = [...playerHome];
    updatedPlayerHome[index].no = e.target.value;
    setPlayerHome(updatedPlayerHome);
  };

  const handleCoachNameChange = (event) => {
    setData((prevData) => ({
      ...prevData,
      name: event.target.value,
    }));
  };

  const handleInputChange2 = (e, index) => {
    const updatedPlayerAway = [...playerAway];
    updatedPlayerAway[index].name = e.target.value;
    setPlayerAway(updatedPlayerAway);
  };

  const renderForms442 = () => {
    const getPlayerPosition = (index) => {
      const positions = [
        "GK",
        "DL",
        "DC",
        "DC",
        "DR",
        "ML",
        "MC",
        "MC",
        "MR",
        "ST",
        "ST",
        "S1",
        "S2",
        "S3",
        "S4",
        "S5",
        "S6",
        "S7",
        "S8",
        "S9",
        "S10",
        "S11",
      ];
      return positions[index] || "";
    };

    const handleDeleteClick = async (playerId) => {
      // Show SweetAlert confirmation dialog
      const confirmation = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      // If user confirms, proceed with deletion
      if (confirmation.isConfirmed) {
        try {
          // Delete player from the API
          await axios.delete(`http://localhost:8000/playerHome/${playerId}`);

          // Update state to remove the deleted player
          setPlayerHome(playerHome.filter((player) => player._id !== playerId));

          // Show success message
          Swal.fire({
            title: "Deleted!",
            text: "The player has been deleted.",
            icon: "success",
          });
        } catch (error) {
          console.error("Error deleting player:", error);
          // Show error message
          Swal.fire({
            title: "Error!",
            text: "An error occurred while deleting the player.",
            icon: "error",
          });
        }
      }
    };

    const handleFileChange = async (e, index) => {
      try {
        const newPlayerHome = [...playerHome];
        const file = e.target.files[0];

        // You may want to perform additional checks on the file, e.g., size, type, etc.

        // Update the corresponding player's photo property
        newPlayerHome[index].photo = file;

        // Update the state with the new array
        setPlayerHome(newPlayerHome);

        // Prepare FormData to send the file to the server
        const formData = new FormData();
        formData.append("file", file);

        // Make a PUT request to update the player's photo on the server
        await axios.put(
          `http://localhost:8000/playerHome/${newPlayerHome[index]._id}/photo`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } catch (error) {
        console.error("Error handling file change:", error);
      }
    };
    // console.log("Player Photo:", playerHome[15].photo);

    return (
      <table className="table-auto w-full bg-slate-300">
        <thead>
          <tr>
            <th className="px-4 py-2">Position</th>
            <th className="px-4 py-2">Player Name</th>
            <th className="px-4 py-2">No Punggung</th>
            <th className="px-4 py-2">Photo</th>
            <th className="px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {playerHome.map((player, index) => (
            // console.log("Player Photo:", player.photo);
            <tr key={player.id}>
              <td className="px-4 py-2">{getPlayerPosition(index)}</td>
              <td className="px-4 py-2">
                <div className="relative mt-2 rounded-md shadow-sm">
                  <input
                    type="text"
                    value={player.name}
                    onChange={(e) => handleInputChange(e, index)}
                    className="rounded-md border-0 py-1.5 pl-7 pr-20 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </td>
              <td className="px-4 py-2">
                <div className="relative mt-2 rounded-md shadow-sm">
                  <input
                    type="text"
                    value={player.no}
                    onChange={(e) => handleNumberChange(e, index)}
                    className="rounded-md border-0 py-1.5 pl-3 pr-10 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </td>
              <td className="px-4 py-2">
                {player.photo ? (
                  <>
                    {/* Log the data for inspection */}
                    {console.log("Player Photo:", player.photo)}

                    {/* Render the image using a standard img tag */}
                    <Image
                      src={`http://localhost:8000/playerHome/${player._id}/photo`}
                      alt={`Player ${player.name}`}
                      width={100} // Specify the desired width
                      height={100} // Specify the desired height
                      className="rounded-full"
                    />
                  </>
                ) : (
                  <div className="relative mt-2 rounded-md shadow-sm">
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(e, index)}
                      className="rounded-md border-0 py-1.5 pl-3 pr-10 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                )}
              </td>
              <td className="px-4 py-2">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded"
                  onClick={() => handleDeleteClick(player._id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  const renderForms4231 = () => {
    const getPlayerPosition = (index) => {
      // Assuming playerHome is an array of players
      const positions = [
        "GK",
        "DL",
        "DC",
        "DC",
        "DR",
        "MC",
        "MC",
        "AML",
        "AMC",
        "AMR",
        "ST",
        "S1",
        "S2",
        "S3",
        "S4",
        "S5",
        "S6",
        "S7",
        "S8",
        "S9",
        "S10",
        "S11",
      ];
      return positions[index] || "";
    };
    return (
      // <div className="flex justify-center">
      <table className="table-auto w-full bg-slate-300">
        <thead>
          <tr>
            <th className="px-4 py-2">Position</th>
            <th className="px-4 py-2">Player Name</th>
            <th className="px-4 py-2">No Punggung</th>
            <th className="px-4 py-2">Photo</th>
          </tr>
        </thead>
        <tbody>
          {playerHome.map((player, index) => (
            <tr key={player.id}>
              <td className="px-4 py-2">{getPlayerPosition(index)}</td>
              <td className="px-4 py-2">
                <div className="relative mt-2 rounded-md shadow-sm">
                  <input
                    type="text"
                    value={player.name}
                    onChange={(e) => handleInputChange(e, index)}
                    className="rounded-md border-0 py-1.5 pl-7 pr-20 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </td>
              <td className="px-4 py-2">
                <div className="relative mt-2 rounded-md shadow-sm">
                  <input
                    type="text"
                    value={player.no}
                    onChange={(e) => handleNumberChange(e, index)}
                    className="rounded-md border-0 py-1.5 pl-3 pr-10 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </td>
              <td className="px-4 py-2">
                <div className="relative mt-2 rounded-md shadow-sm">
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, index)}
                    className="rounded-md border-0 py-1.5 pl-3 pr-10 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      // </div>
    );
  };
  const renderForms433 = () => {
    const getPlayerPosition = (index) => {
      // Assuming playerHome is an array of players
      const positions = [
        "GK",
        "DL",
        "DC",
        "DC",
        "DR",
        "DM",
        "MC",
        "MC",
        "AML",
        "AMR",
        "ST",
        "S1",
        "S2",
        "S3",
        "S4",
        "S5",
        "S6",
        "S7",
        "S8",
        "S9",
        "S10",
        "S11",
      ];
      return positions[index] || "";
    };
    return (
      // <div className="flex justify-center">
      <table className="table-auto w-full bg-slate-300">
        <thead>
          <tr>
            <th className="px-4 py-2">Position</th>
            <th className="px-4 py-2">Player Name</th>
            <th className="px-4 py-2">No Punggung</th>
            <th className="px-4 py-2">Photo</th>
          </tr>
        </thead>
        <tbody>
          {playerHome.map((player, index) => (
            <tr key={player.id}>
              <td className="px-4 py-2">{getPlayerPosition(index)}</td>
              <td className="px-4 py-2">
                <div className="relative mt-2 rounded-md shadow-sm">
                  <input
                    type="text"
                    value={player.name}
                    onChange={(e) => handleInputChange(e, index)}
                    className="rounded-md border-0 py-1.5 pl-7 pr-20 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </td>
              <td className="px-4 py-2">
                <div className="relative mt-2 rounded-md shadow-sm">
                  <input
                    type="text"
                    value={player.no}
                    onChange={(e) => handleNumberChange(e, index)}
                    className="rounded-md border-0 py-1.5 pl-3 pr-10 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </td>
              <td className="px-4 py-2">
                <div className="relative mt-2 rounded-md shadow-sm">
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(e, index)}
                    className="rounded-md border-0 py-1.5 pl-3 pr-10 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      // </div>
    );
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

  const handleFormationSelect = (formation) => {
    setSelectedFormation(formation);
    setIsFormVisible(true);
  };

  const handleToggleForm = () => {
    // setFormVisibility(!isFormVisible);
    setIsFormVisible((prevIsFormVisible) => !prevIsFormVisible);
  };

  const renderSelectedForm = () => {
    if (!isFormVisible) {
      return null;
    }

    if (selectedFormation === "4-4-2") {
      return renderForms442();
    } else if (selectedFormation === "4-2-3-1") {
      return renderForms4231();
    } else if (selectedFormation === "4-3-3") {
      return renderForms433();
    }
    return null; // Return null if no formation is selected
  };

  const handleSubmit3 = () => {
    // Handle form submission
    console.log("Selected Formation:", selectedFormation);
  };
  const newPlayer = {
    name: "",
    no: "",

    photo: null, // Assuming you want to upload a photo
  };

  const createPlayer = async (newPlayer) => {
    try {
      if (!newPlayer) {
        console.error("Error creating player: 'newPlayer' is undefined.");
        return;
      }

      // Ensure that 'name' and 'no' properties are present
      // if (!newPlayer.name || !newPlayer.no) {
      //   console.error(
      //     "Error creating player: 'name' and 'no' are required properties."
      //   );
      //   return;
      // }

      // Create a new FormData object
      const formData = new FormData();

      // Append key-value pairs to the FormData object
      formData.append("name", newPlayer.name);
      formData.append("no", newPlayer.no);
      formData.append("Position", newPlayer.Position || "");

      // If there's a photo, append it to FormData
      if (newPlayer.photo) {
        formData.append("file", newPlayer.photo);
      }

      // Make a POST request using Axios
      const response = await axios.post(
        "http://localhost:8000/playerHome",
        formData
      );

      const createdPlayer = response.data;

      // Fetch the updated list of players
      const updatedResponse = await axios.get(
        "http://localhost:8000/playerHome"
      );
      const updatedPlayers = updatedResponse.data;

      // Update state with the new list of players
      setPlayerHome(updatedPlayers);
    } catch (error) {
      console.error("Error creating player:", error);
    }
  };

  // console.log(coachName);

  return (
    <Fragment>
      <Navbar isAuthenticated={isAuthenticated} />

      <div className="bg-slate-300">
        <Tabs>
          <TabList>
            <Tab>Test</Tab>
            <Tab>Control</Tab>
            <Tab>Team & Score</Tab>
            <Tab>Formation Home</Tab>
            <Tab>Formation Away</Tab>
          </TabList>

          <TabPanel>
            {/* <div className="flex justify-evenly ">
              <button
                onClick=""
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
              >
                Select All
              </button>
              <button
                onClick=""
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
              >
                Unselect All
              </button>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                <FontAwesomeIcon icon={faTrash} className="" />
              </button>
              <button
                onClick=""
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
              >
                Add Player
              </button>
            </div> */}
            <div className={`${styles.container}`}>
              <div className={`${styles.box1}`}>
                <h2>Formation Home</h2>
                <DropdownButton
                  options={["4-4-2", "4-2-3-1", "4-3-3"]}
                  onSelect={handleFormationSelect}
                  label="Select Formation"
                />

                <div className="mt-5 ml-5">{renderSelectedForm()}</div>
                {selectedFormation && isFormVisible && (
                  <div className="mt-5 ml-5">
                    <button
                      onClick={handleToggleForm}
                      className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 border border-teal-700 rounded"
                    >
                      Hide Form
                    </button>

                    <button
                      onClick={handleSubmit}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                    >
                      Submit
                    </button>

                    <button
                      onClick={handleSubmit}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded"
                    >
                      Cancel
                    </button>

                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                      onClick={() => createPlayer(newPlayer)}
                    >
                      Add Player
                    </button>
                  </div>
                )}

                {data ? (
                  <div className="ml-4 mt-5">
                    <form onSubmit={handleSubmitCoach}>
                      <label>
                        Coach:
                        <input
                          type="text"
                          value={data.name || ""}
                          onChange={handleCoachNameChange}
                          placeholder={data[0].name}
                        />
                        <button type="submit" className="">
                          Submit
                        </button>
                      </label>
                    </form>
                  </div>
                ) : (
                  <p>Loading...</p>
                )}
                <div className="ml-4 mt-5">
                  Coach Name: {data ? data[0].name : "Loading..."}
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-center">
              <iframe
                src="http://localhost:3000/"
                title="Content from localhost:3000"
                width="95%"
                height="800"
              />
            </div>
          </TabPanel>
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
            <TimerButton />
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
          <TabPanel className="formationHome">
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
            </div>
          </TabPanel>
          <TabPanel className="formationAway">
            <div className={`${styles.container} h-screen`}>
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
};
export default withAuth(Admin);
