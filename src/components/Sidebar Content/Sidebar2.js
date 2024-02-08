import React, { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import Subtitutions from "../Subtitution";
import Control from "./Control";
import TeamScore from "./TeamScore";
import axios from "axios";
import DropdownButton from "../Dropdown";
import TimerButton from "../Timer/timerButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { Tab } from "@headlessui/react";
import Swal from "sweetalert2";
import getConfig from "next/config";
import { useUser, UserButton, SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import GoalPlayer from "../Player Component/GoalPlayer";
import Plus from "../../assets/Plus.png";
import Play from "../../assets/PlayCircle.png";
import PlayBlack from "../../assets/PlayCircleBlack.png";
import Presentation from "../../assets/Presentation.png";
import Timer from "../Timer/timer3";
import { useStopwatch } from "../Timer/timerAdmin";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SideBar = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("Control");
  const [score, setScore] = useState(null);
  const [playerHome, setPlayerHome] = useState([]);
  const [playerAway, setPlayerAway] = useState([]);
  const [showForm1, setShowForm1] = useState(false);
  const [showForm2, setShowForm2] = useState(false);
  const [showForm3, setShowForm3] = useState(false);
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
  const [selectedFormationAway, setSelectedFormationAway] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [isFormVisibleAway, setIsFormVisibleAway] = useState(true);
  const [data, setData] = useState(null);
  const [coachAway, setCoachAway] = useState(null);
  const [pageColor, setPageColor] = useState("#17192D");
  const [pageColor2, setPageColor2] = useState("#17192D");
  const { publicRuntimeConfig } = getConfig();
  const { IFRAME_URL } = publicRuntimeConfig;
  const { user, isLoaded } = useUser();

  const {
    time,
    isRunning,
    startTimer,
    pauseTimer,
    handleStartFromZero,
    handleStartFrom45,
  } = useStopwatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_DATABASE_URL}/coach`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching coach data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchPlayerHome = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_DATABASE_URL}/playerHome`
        );
        setPlayerHome(response.data);
      } catch (error) {
        console.error("Error fetching player home data:", error);
      }
    };

    fetchPlayerHome();
  }, []);

  useEffect(() => {
    const fetchPlayerAway = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_DATABASE_URL}/playerAway`
        );
        setPlayerAway(response.data);
      } catch (error) {
        console.error("Error fetching player away data:", error);
      }
    };

    fetchPlayerAway();
  }, []);

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_DATABASE_URL}/score`
        );
        setScore(response.data[0]);
      } catch (error) {
        console.error("Error fetching score data:", error);
      }
    };

    fetchScore();
  }, []);

  useEffect(() => {
    const localStorageValue = localStorage.getItem("showComponent");
    setShowGoalPlayer(localStorageValue === "3");

    // if localstorage != current state remove item

    // if (localStorageValue !== "3") {
    //   localStorage.removeItem("clickedButton");
    //   localStorage.removeItem("playerPhotoUrl");
    // }
  }, []);

  useEffect(() => {
    const fetchCoachAway = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_DATABASE_URL}/coach`
        );
        setCoachAway(response.data);
      } catch (error) {
        console.error("Error fetching coach away data:", error);
      }
    };

    fetchCoachAway();
  }, []);

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
        const promises = playerHome.map(async ({ _id, name, no, photo }) => {
          // Update player data
          await axios.put(
            `${process.env.NEXT_PUBLIC_DATABASE_URL}/playerHome/${_id}`,
            { name, no }
          );

          // Update player photo if it exists
          if (photo) {
            const formData = new FormData();
            formData.append("file", photo);

            await axios.put(
              `${process.env.NEXT_PUBLIC_DATABASE_URL}/playerHome/${_id}/photo`,
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
          }
        });

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

  const handleSubmitAway = async () => {
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
        const promises = playerAway.map(({ _id, name, no }) =>
          axios.put(
            `${process.env.NEXT_PUBLIC_DATABASE_URL}/playerAway/${_id}`,
            { name, no }
          )
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

  const handleSubmitCoach = async (e) => {
    e.preventDefault();

    try {
      // Assuming data[0].id exists in your coach data
      const coachId = data[0]._id;

      const updatedData = {
        name: data.name,
      };

      // Make the PUT request to update the coach name
      await axios.put(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/coach/${coachId}`,
        updatedData
      );

      // Fetch the latest data after the update
      const response = await axios.get(
        "${process.env.NEXT_PUBLIC_DATABASE_URL}/coach"
      );
      setData(response.data);

      console.log("Coach data saved successfully!");
    } catch (error) {
      console.error("Error saving coach data:", error);
    }
  };

  const handleSubmitCoachAway = async (e) => {
    e.preventDefault();

    try {
      // Assuming data[0].id exists in your coach data
      const coachId = coachAway[1]._id;

      const updatedData = {
        name: coachAway.name,
      };

      // Make the PUT request to update the coach name
      await axios.put(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/coach/${coachId}`,
        updatedData
      );

      // Fetch the latest data after the update
      const response = await axios.get(
        "${process.env.NEXT_PUBLIC_DATABASE_URL}/coach"
      );
      setCoachAway(response.data);

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

  const handleInputChangeAway = (e, index) => {
    const updatedPlayerAway = [...playerAway];
    updatedPlayerAway[index].name = e.target.value;
    setPlayerAway(updatedPlayerAway);
  };

  const handleNumberChange = (e, index) => {
    const updatedPlayerHome = [...playerHome];
    updatedPlayerHome[index].no = e.target.value;
    setPlayerHome(updatedPlayerHome);
  };

  const handleNumberChangeAway = (e, index) => {
    const updatedPlayerAway = [...playerAway];
    updatedPlayerAway[index].no = e.target.value;
    setPlayerAway(updatedPlayerAway);
  };

  const handleCoachNameChange = (event) => {
    setData((prevData) => ({
      ...prevData,
      name: event.target.value,
    }));
  };

  const handleCoachNameChangeAway = (event) => {
    setCoachAway((prevData) => ({
      ...prevData,
      name: event.target.value,
    }));
  };

  const renderForms442 = () => {
    const getPlayerPosition = (index) => {
      const positions = [
        "GK",
        "LB",
        "CB",
        "CB",
        "RB",
        "LM",
        "CM",
        "CM",
        "RM",
        "CF",
        "CF",
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
          await axios.delete(
            `${process.env.NEXT_PUBLIC_DATABASE_URL}/playerHome/${playerId}`
          );

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
          `${process.env.NEXT_PUBLIC_DATABASE_URL}/playerHome/${newPlayerHome[index]._id}/photo`,
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
    const handleClearFormClick = (index) => {
      setPlayerHome((prevPlayerHome) => {
        // Create a new array with the same length as playerHome
        const newPlayerHome = prevPlayerHome.map((player, i) => {
          if (i === index) {
            // Reset the player data for the clicked row, including clearing the photo
            return { ...player, photo: null, name: "", no: "0" };
          }
          return player;
        });

        // Return the new array to update the state
        return newPlayerHome;
      });

      // Also, update the server-side data to remove the photo information
      const playerId = playerHome[index]._id;
      axios
        .put(
          `${process.env.NEXT_PUBLIC_DATABASE_URL}/playerHome/${playerId}/photo`,
          { photo: null }
        )
        .then(() => {
          console.log("Server photo data cleared successfully!");
        })
        .catch((error) => {
          console.error("Error clearing server photo data:", error);
        });
    };

    return (
      <table className="table-auto w-full bg-slate-300">
        <thead>
          <tr className="">
            <th className="px-4 py-2">Position</th>
            <th className="px-4 py-2">Player Name</th>
            <th className="px-4 py-2">No Punggung</th>
            <th className="px-4 py-2">Photo</th>
            <th className="px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody className="">
          {playerHome.map((player, index) => (
            // console.log("Player Photo:", player.photo);
            <tr key={player.id}>
              <td className="px-4 py-2 flex items-center justify-center">
                {getPlayerPosition(index)}
              </td>
              <td className="px-4 py-2">
                <div className="relative mt-2 rounded-md shadow-sm flex items-center justify-center">
                  <input
                    type="text"
                    value={player.name}
                    onChange={(e) => handleInputChange(e, index)}
                    className="rounded-md border-0 py-1.5 pl-7 pr-20 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </td>
              <td className="px-4 py-2">
                <div className="relative mt-2 rounded-md shadow-sm flex items-center justify-center">
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
                    <Image
                      key={player.photo ? player.photo : "default"}
                      src={`${process.env.NEXT_PUBLIC_DATABASE_URL}/playerHome/${player._id}/photo`}
                      alt={`Player ${player.name}`}
                      width={45}
                      height={45}
                      className="flex items-center justify-center"
                    />
                  </>
                ) : (
                  <div className="relative mt-2 rounded-md shadow-sm flex items-center justify-center">
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(e, index)}
                      className="rounded-md border-0 py-1.5 pl-3 pr-10 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                )}
              </td>
              <td className="px-4 py-2 flex items-center justify-center">
                {index >= 11 && (
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded"
                    onClick={() => handleDeleteClick(player._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                )}
              </td>
              <td className="px-4 py-2 flex items-center justify-center">
                <button
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 border border-yellow-700 rounded"
                  onClick={() => handleClearFormClick(index)}
                >
                  Clear Form
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
        "LB",
        "CB",
        "CB",
        "RB",
        "CM",
        "CM",
        "LW",
        "AM",
        "RW",
        "CF",
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
          await axios.delete(
            `${process.env.NEXT_PUBLIC_DATABASE_URL}/playerHome/${playerId}`
          );

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
          `${process.env.NEXT_PUBLIC_DATABASE_URL}/playerHome/${newPlayerHome[index]._id}/photo`,
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
              <td className="px-4 py-2 flex items-center justify-center">
                {getPlayerPosition(index)}
              </td>
              <td className="px-4 py-2">
                <div className="relative mt-2 rounded-md shadow-sm flex items-center justify-center">
                  <input
                    type="text"
                    value={player.name}
                    onChange={(e) => handleInputChange(e, index)}
                    className="rounded-md border-0 py-1.5 pl-7 pr-20 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </td>
              <td className="px-4 py-2">
                <div className="relative mt-2 rounded-md shadow-sm flex items-center justify-center">
                  <input
                    type="text"
                    value={player.no}
                    onChange={(e) => handleNumberChange(e, index)}
                    className="rounded-md border-0 py-1.5 pl-3 pr-10 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </td>
              <td className="px-4 py-2 ">
                {player.photo ? (
                  <>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_DATABASE_URL}/playerHome/${player._id}/photo`}
                      alt={`Player ${player.name}`}
                      width={45}
                      height={45}
                      className="flex items-center justify-center"
                    />
                  </>
                ) : (
                  <div className="relative mt-2 rounded-md shadow-sm flex items-center justify-center">
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(e, index)}
                      className="rounded-md border-0 py-1.5 pl-3 pr-10 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                )}
              </td>
              <td className="px-4 py-2 flex items-center justify-center">
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
  const renderForms433 = () => {
    const getPlayerPosition = (index) => {
      // Assuming playerHome is an array of players
      const positions = [
        "GK",
        "LB",
        "CB",
        "CB",
        "RB",
        "DM",
        "CM",
        "CM",
        "LW",
        "RW",
        "CF",
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
          await axios.delete(
            `${process.env.NEXT_PUBLIC_DATABASE_URL}/playerHome/${playerId}`
          );

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
          `${process.env.NEXT_PUBLIC_DATABASE_URL}/playerHome/${newPlayerHome[index]._id}/photo`,
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
              <td className="px-4 py-2 flex items-center justify-center">
                {getPlayerPosition(index)}
              </td>
              <td className="px-4 py-2">
                <div className="relative mt-2 rounded-md shadow-sm flex items-center justify-center">
                  <input
                    type="text"
                    value={player.name}
                    onChange={(e) => handleInputChange(e, index)}
                    className="rounded-md border-0 py-1.5 pl-7 pr-20 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </td>
              <td className="px-4 py-2">
                <div className="relative mt-2 rounded-md shadow-sm flex items-center justify-center">
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
                    <Image
                      src={`${process.env.NEXT_PUBLIC_DATABASE_URL}/playerHome/${player._id}/photo`}
                      alt={`Player ${player.name}`}
                      width={45}
                      height={45}
                      className="flex items-center justify-center"
                    />
                  </>
                ) : (
                  <div className="flex items-center justify-center">
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(e, index)}
                      className="rounded-md border-0 py-1.5 pl-3 pr-10 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                )}
              </td>
              <td className="px-4 py-2 flex items-center justify-center">
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
  const renderForms442Away = () => {
    const getPlayerPosition = (index) => {
      const positions = [
        "GK",
        "LB",
        "CB",
        "CB",
        "RB",
        "LM",
        "CM",
        "CM",
        "RM",
        "CF",
        "CF",
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
          await axios.delete(
            `${process.env.NEXT_PUBLIC_DATABASE_URL}/playerAway/${playerId}`
          );

          // Update state to remove the deleted player
          setPlayerAway(playerAway.filter((player) => player._id !== playerId));

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
        const newPlayerAway = [...playerAway];
        const file = e.target.files[0];

        // You may want to perform additional checks on the file, e.g., size, type, etc.

        // Update the corresponding player's photo property
        newPlayerAway[index].photo = file;

        // Update the state with the new array
        setPlayerAway(newPlayerAway);

        // Prepare FormData to send the file to the server
        const formData = new FormData();
        formData.append("file", file);

        // Make a PUT request to update the player's photo on the server
        await axios.put(
          `${process.env.NEXT_PUBLIC_DATABASE_URL}/playerAway/${newPlayerAway[index]._id}/photo`,
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
          {playerAway.map((player, index) => (
            // console.log("Player Photo:", player.photo);
            <tr key={player.id}>
              <td className="px-4 py-2 flex justify-center">
                {getPlayerPosition(index)}
              </td>
              <td className="px-4 py-2">
                <div className="relative mt-2 rounded-md shadow-sm flex justify-center">
                  <input
                    type="text"
                    value={player.name}
                    onChange={(e) => handleInputChangeAway(e, index)}
                    className="rounded-md border-0 py-1.5 pl-7 pr-20 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </td>
              <td className="px-4 py-2">
                <div className="relative mt-2 rounded-md shadow-sm flex justify-center">
                  <input
                    type="text"
                    value={player.no}
                    onChange={(e) => handleNumberChangeAway(e, index)}
                    className="rounded-md border-0 py-1.5 pl-3 pr-10 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </td>
              <td className="px-4 py-2">
                {player.photo ? (
                  <>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_DATABASE_URL}/playerAway/${player._id}/photo`}
                      alt={`Player ${player.name}`}
                      width={45}
                      height={45}
                      className="flex justify-center"
                    />
                  </>
                ) : (
                  <div className="relative mt-2 rounded-md shadow-sm flex justify-center">
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(e, index)}
                      className="rounded-md border-0 py-1.5 pl-3 pr-10 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                )}
              </td>
              <td className="px-4 py-2 flex justify-center">
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
  const renderForms4231Away = () => {
    const getPlayerPosition = (index) => {
      const positions = [
        "GK",
        "LB",
        "CB",
        "CB",
        "RB",
        "CM",
        "CM",
        "LW",
        "AM",
        "RW",
        "CF",
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
          await axios.delete(
            `${process.env.NEXT_PUBLIC_DATABASE_URL}/playerAway/${playerId}`
          );

          // Update state to remove the deleted player
          setPlayerAway(playerAway.filter((player) => player._id !== playerId));

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
        const newPlayerAway = [...playerAway];
        const file = e.target.files[0];

        // You may want to perform additional checks on the file, e.g., size, type, etc.

        // Update the corresponding player's photo property
        newPlayerAway[index].photo = file;

        // Update the state with the new array
        setPlayerAway(newPlayerAway);

        // Prepare FormData to send the file to the server
        const formData = new FormData();
        formData.append("file", file);

        // Make a PUT request to update the player's photo on the server
        await axios.put(
          `${process.env.NEXT_PUBLIC_DATABASE_URL}/playerAway/${newPlayerAway[index]._id}/photo`,
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
          {playerAway.map((player, index) => (
            // console.log("Player Photo:", player.photo);
            <tr key={player.id}>
              <td className="px-4 py-2 flex justify-center">
                {getPlayerPosition(index)}
              </td>
              <td className="px-4 py-2">
                <div className="relative mt-2 rounded-md shadow-sm flex justify-center">
                  <input
                    type="text"
                    value={player.name}
                    onChange={(e) => handleInputChangeAway(e, index)}
                    className="rounded-md border-0 py-1.5 pl-7 pr-20 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </td>
              <td className="px-4 py-2">
                <div className="relative mt-2 rounded-md shadow-sm flex justify-center">
                  <input
                    type="text"
                    value={player.no}
                    onChange={(e) => handleNumberChangeAway(e, index)}
                    className="rounded-md border-0 py-1.5 pl-3 pr-10 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </td>
              <td className="px-4 py-2">
                {player.photo ? (
                  <>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_DATABASE_URL}/playerAway/${player._id}/photo`}
                      alt={`Player ${player.name}`}
                      width={45}
                      height={45}
                      className="flex justify-center"
                    />
                  </>
                ) : (
                  <div className="relative mt-2 rounded-md shadow-sm flex justify-center">
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(e, index)}
                      className="rounded-md border-0 py-1.5 pl-3 pr-10 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                )}
              </td>
              <td className="px-4 py-2 flex justify-center">
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
  const renderForms433Away = () => {
    const getPlayerPosition = (index) => {
      const positions = [
        "GK",
        "LB",
        "CB",
        "CB",
        "RB",
        "DM",
        "CM",
        "CM",
        "LW",
        "RW",
        "CF",
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
          await axios.delete(
            `${process.env.NEXT_PUBLIC_DATABASE_URL}/playerAway/${playerId}`
          );

          // Update state to remove the deleted player
          setPlayerAway(playerAway.filter((player) => player._id !== playerId));

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
        const newPlayerAway = [...playerAway];
        const file = e.target.files[0];

        // You may want to perform additional checks on the file, e.g., size, type, etc.

        // Update the corresponding player's photo property
        newPlayerAway[index].photo = file;

        // Update the state with the new array
        setPlayerAway(newPlayerAway);

        // Prepare FormData to send the file to the server
        const formData = new FormData();
        formData.append("file", file);

        // Make a PUT request to update the player's photo on the server
        await axios.put(
          `${process.env.NEXT_PUBLIC_DATABASE_URL}/playerAway/${newPlayerAway[index]._id}/photo`,
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
          {playerAway.map((player, index) => (
            // console.log("Player Photo:", player.photo);
            <tr key={player.id}>
              <td className="px-4 py-2 flex justify-center">
                {getPlayerPosition(index)}
              </td>
              <td className="px-4 py-2">
                <div className="relative mt-2 rounded-md shadow-sm flex justify-center">
                  <input
                    type="text"
                    value={player.name}
                    onChange={(e) => handleInputChangeAway(e, index)}
                    className="rounded-md border-0 py-1.5 pl-7 pr-20 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </td>
              <td className="px-4 py-2">
                <div className="relative mt-2 rounded-md shadow-sm flex justify-center">
                  <input
                    type="text"
                    value={player.no}
                    onChange={(e) => handleNumberChangeAway(e, index)}
                    className="rounded-md border-0 py-1.5 pl-3 pr-10 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </td>
              <td className="px-4 py-2">
                {player.photo ? (
                  <>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_DATABASE_URL}/playerAway/${player._id}/photo`}
                      alt={`Player ${player.name}`}
                      width={45}
                      height={45}
                      className="flex justify-center"
                    />
                  </>
                ) : (
                  <div className="relative mt-2 rounded-md shadow-sm flex justify-center">
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(e, index)}
                      className="rounded-md border-0 py-1.5 pl-3 pr-10 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                )}
              </td>
              <td className="px-4 py-2 flex justify-center">
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

  const toggleComponent1Or3 = () => {
    setShowGoalPlayer((prevShowGoalPlayer) => {
      const newShowGoalPlayer = !prevShowGoalPlayer;

      // Update localStorage based on the new value
      localStorage.setItem("showComponent", newShowGoalPlayer ? "3" : "1");

      // Set component to 3 after clicking "Show Goal Player"
      if (newShowGoalPlayer) {
        localStorage.setItem("showComponent", "3");
      }

      return newShowGoalPlayer;
    });
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
    setShowYellowPlayer((prevShowYellowPlayer) => {
      const newShowYellowPlayer = !prevShowYellowPlayer;

      // Update localStorage based on the new value
      localStorage.setItem("showComponent", newShowYellowPlayer ? "4" : "1");

      // Set component to 3 after clicking "Show Yellow Player"
      if (newShowYellowPlayer) {
        localStorage.setItem("showComponent", "4");
      }

      return newShowYellowPlayer;
    });
  };

  const toggleComponent5 = () => {
    setShowRedPlayer((prevShowRedPlayer) => {
      const newShowRedPlayer = !prevShowRedPlayer;

      // Update localStorage based on the new value
      localStorage.setItem("showComponent", newShowRedPlayer ? "5" : "1");

      // Set component to 5 after clicking "Show Red Player"
      if (newShowRedPlayer) {
        localStorage.setItem("showComponent", "5");
      }

      return newShowRedPlayer;
    });
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
  const handleFormationSelect = (formation) => {
    setSelectedFormation(formation);
    setIsFormVisible(true);

    // Toggle the respective form visibility based on the button clicked
    setShowFormation4231Home(false);
    setShowFormation442Home(false);
    setShowFormation433Home(false);
    if (formation === "4-4-2") {
      setShowFormation442Home(true);
      setShowForm1(true);
      setShowForm2(false);
      setShowForm3(false);
    } else if (formation === "4-2-3-1") {
      setShowFormation4231Home(true);
      setShowForm1(false);
      setShowForm2(true);
      setShowForm3(false);
    } else if (formation === "4-3-3") {
      setShowFormation433Home(true);
      setShowForm1(false);
      setShowForm2(false);
      setShowForm3(true);
    }
    const stateProps = {
      showFormation442Home,
      setShowFormation442Home,
      showFormation4231Home,
      setShowFormation4231Home,
      showFormation433Home,
      setShowFormation433Home,
    };
    return <Control {...stateProps} />;
  };

  const handleFormationSelectAway = (formation) => {
    setSelectedFormationAway(formation);
    setIsFormVisibleAway(true);

    // Toggle the respective form visibility based on the button clicked
    setShowFormation4231Away(false);
    setShowFormation442Away(false);
    setShowFormation433Away(false);
    if (formation === "4-4-2") {
      setShowFormation442Away(true);
      setShowForm1(true);
      setShowForm2(false);
      setShowForm3(false);
    } else if (formation === "4-2-3-1") {
      setShowFormation4231Away(true);
      setShowForm1(false);
      setShowForm2(true);
      setShowForm3(false);
    } else if (formation === "4-3-3") {
      setShowFormation433Away(true);
      setShowForm1(false);
      setShowForm2(false);
      setShowForm3(true);
    }
  };

  const handleToggleForm = () => {
    // setFormVisibility(!isFormVisible);
    setIsFormVisible((prevIsFormVisible) => !prevIsFormVisible);
  };

  const handleToggleFormAway = () => {
    // setFormVisibility(!isFormVisible);
    setIsFormVisibleAway((prevIsFormVisibleAway) => !prevIsFormVisibleAway);
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

  const renderSelectedFormAway = () => {
    if (!isFormVisibleAway) {
      return null;
    }

    if (selectedFormationAway === "4-4-2") {
      return renderForms442Away();
    } else if (selectedFormationAway === "4-2-3-1") {
      return renderForms4231Away();
    } else if (selectedFormationAway === "4-3-3") {
      return renderForms433Away();
    }
    return null; // Return null if no formation is selected
  };

  const newPlayer = {
    name: "",
    no: "",

    photo: null, // Assuming you want to upload a photo
  };
  const handleClearAllForm = () => {
    // Reset the state values for all players in the array to their initial state or empty values
    setPlayerHome((prevPlayerHome) =>
      prevPlayerHome.map((player) => ({
        ...player,
        name: "",
        no: "",
        photo: null,
      }))
    );
  };

  const createPlayer = async (newPlayer) => {
    try {
      if (!newPlayer) {
        console.error("Error creating player: 'newPlayer' is undefined.");
        return;
      }

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
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/playerHome`,
        formData
      );

      const createdPlayer = response.data;

      // Fetch the updated list of players
      const updatedResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/playerHome`
      );
      const updatedPlayers = updatedResponse.data;

      // Update state with the new list of players
      setPlayerHome(updatedPlayers);
    } catch (error) {
      console.error("Error creating player:", error);
    }
  };

  const createPlayerAway = async (newPlayer) => {
    try {
      if (!newPlayer) {
        console.error("Error creating player: 'newPlayer' is undefined.");
        return;
      }

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
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/playerAway`,
        formData
      );

      const createdPlayer = response.data;

      // Fetch the updated list of players
      const updatedResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/playerAway`
      );
      const updatedPlayers = updatedResponse.data;

      // Update state with the new list of players
      setPlayerAway(updatedPlayers);
    } catch (error) {
      console.error("Error creating player:", error);
    }
  };

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };
  // tabs

  const renderComponent = () => {
    switch (selectedMenuItem) {
      case "FormationHome":
        return (
          <>
            <div className="mt-5">
              <div className={``}>
                <div className={`ml-9 `}>
                  <h2>Formation Home</h2>
                  <DropdownButton
                    options={["4-4-2", "4-2-3-1", "4-3-3"]}
                    onSelect={handleFormationSelect}
                    label="Select Formation"
                  />

                  <div className="mt-5 ">{renderSelectedForm()}</div>
                  {selectedFormation && isFormVisible && (
                    <div className="mt-5 ml-5 flex justify-center">
                      <button
                        onClick={handleToggleForm}
                        className="mr-4 bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 border border-teal-700 rounded"
                      >
                        Hide Form
                      </button>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                        onClick={() => createPlayer(newPlayer)}
                      >
                        Add Player
                      </button>
                      <button
                        className="mr-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded"
                        onClick={handleClearAllForm}
                      >
                        Clear All
                      </button>
                      <button
                        onClick={handleSubmit}
                        className="mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                      >
                        Submit
                      </button>
                    </div>
                  )}

                  {data ? (
                    <div className="mt-5">
                      <form onSubmit={handleSubmitCoach}>
                        <label>
                          Coach:
                          <input
                            type="text"
                            value={data.name || ""}
                            onChange={handleCoachNameChange}
                            placeholder={data[0].name}
                          />
                          <button
                            type="submit"
                            className="text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full px-3 py-2 me-2 ml-3 text-sm  bg-blue-500 hover:bg-blue-700"
                          >
                            Submit
                          </button>
                        </label>
                      </form>
                    </div>
                  ) : (
                    <p>Loading...</p>
                  )}
                  <div className="mt-5">
                    Coach Name: {data ? data[0].name : "Loading..."}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-center">
              <iframe
                src={IFRAME_URL}
                title="Content from localhost:3000"
                width="95%"
                height="800"
              />
            </div>
          </>
        );
      case "Subtitution":
        return <Subtitutions />;
      case "Control":
        return (
          <>
            <div className="flex mt-5">
              <div className="w-1/4 bg-[#000000] p-4 mr-2 h-32 flex justify-center items-center shadow-lg border border-[#E4E4E7] rounded-lg">
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer flex justify-center items-center flex-col"
                >
                  <div className="">
                    <div className="flex justify-center items-center mb-3">
                      <Image
                        src={Presentation}
                        alt="Presentation"
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className="text-white">View Board</div>
                  </div>
                </a>
              </div>
              <div className="w-1/4 bg-[#EAEAEA] p-4 mr-2 h-32 flex justify-center items-center shadow-lg border border-[#E4E4E7] rounded-lg">
                <div className="">
                  <div style={{ textAlign: "center" }}>
                    <div id="reset-btn" style={{ fontSize: "60px" }}>
                      <span className="text-black">{formatTime(time)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="w-1/4 bg-[#5AD8AE] p-4 mr-2 flex justify-center items-center rounded-lg shadow-lg cursor-pointer"
                onClick={isRunning ? pauseTimer : startTimer}
              >
                {isRunning ? (
                  "Pause"
                ) : (
                  <>
                    <div>
                      <div className="flex justify-center items-center mb-3">
                        <Image src={Play} alt="play" width={40} height={40} />
                      </div>
                      <div className="flex justify-center items-center">
                        Start
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div
                className="w-1/4 bg-[#5786E3] p-4 mr-2 flex justify-center items-center rounded-lg shadow-lg cursor-pointer"
                onClick={handleStartFromZero}
              >
                <div className="">
                  <div className="flex justify-center items-center mb-3">
                    <Image src={Play} alt="play" width={40} height={40} />
                  </div>
                  <div>First Half</div>
                </div>
              </div>
              <div
                className="w-1/4 bg-[#FFCB82] p-4 mr-2 flex justify-center items-center rounded-lg shadow-lg cursor-pointer"
                onClick={handleStartFrom45}
              >
                <div className="">
                  <div className="flex justify-center items-center mb-3">
                    <Image
                      src={PlayBlack}
                      alt="PlayBlack"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div>Second Half</div>
                </div>
              </div>
            </div>
            {/* tabs */}
            <Tab.Group>
              <div className="w-full max-w-md px-2 py-8 sm:px-0">
                <Tab.List className="flex space-x-1 rounded-xl bg-[#EAEAEA] p-2">
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                        "focus:outline-none",
                        selected
                          ? "bg-white text-black shadow"
                          : "text-black hover:bg-white/[0.12] hover:text-black"
                      )
                    }
                  >
                    Dashboard
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                        "focus:outline-none",
                        selected
                          ? "bg-white text-black shadow"
                          : "text-black hover:bg-white/[0.12] hover:text-black"
                      )
                    }
                  >
                    Goal Player
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                        "focus:outline-none",
                        selected
                          ? "bg-white text-black shadow"
                          : "text-black hover:bg-white/[0.12] hover:text-black"
                      )
                    }
                  >
                    Yellow Card
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                        "focus:outline-none",
                        selected
                          ? "bg-white text-black shadow"
                          : "text-black hover:bg-white/[0.12] hover:text-black"
                      )
                    }
                  >
                    Red Card
                  </Tab>
                </Tab.List>
              </div>
              <Tab.Panels>
                <Tab.Panel
                  className={classNames(
                    "rounded-xl bg-white p-3",
                    "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                  )}
                >
                  {" "}
                  <div className="flex items-center justify-center mb-5 mr-2">
                    <iframe
                      className="rounded-lg"
                      src={IFRAME_URL}
                      title="Content from localhost:3000"
                      width="100%"
                      height="800"
                    />
                  </div>
                </Tab.Panel>
                <Tab.Panel
                  className={classNames(
                    "rounded-xl bg-white p-3",
                    "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                  )}
                >
                  <GoalPlayer />
                  <div className="flex items-center justify-center mb-5 mr-2">
                    <iframe
                      className="rounded-lg"
                      src={IFRAME_URL}
                      title="Content from localhost:3000"
                      width="100%"
                      height="800"
                    />
                  </div>
                </Tab.Panel>
                <Tab.Panel
                  className={classNames(
                    "rounded-xl bg-white p-3",
                    "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                  )}
                >
                  <GoalPlayer />
                  <div className="flex items-center justify-center mb-5 mr-2">
                    <iframe
                      className="rounded-lg"
                      src={IFRAME_URL}
                      title="Content from localhost:3000"
                      width="100%"
                      height="800"
                    />
                  </div>
                </Tab.Panel>
                <Tab.Panel
                  className={classNames(
                    "rounded-xl bg-white p-3",
                    "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                  )}
                >
                  <GoalPlayer />
                  <div className="flex items-center justify-center mb-5 mr-2">
                    <iframe
                      className="rounded-lg"
                      src={IFRAME_URL}
                      title="Content from localhost:3000"
                      width="100%"
                      height="800"
                    />
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>

            {/* <div className="container flex mt-5">
              <div className="flex-auto w-64 ml-10">
                <button
                  onClick={toggleComponent1}
                  className="mr-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                >
                  Show Scoreboard
                </button>
                <button
                  onClick={toggleComponent1Or3}
                  className="mr-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                >
                  {showGoalPlayer ? "Hide Goal Player" : "Show Goal Player"}
                </button>

                <button
                  onClick={toggleComponent4}
                  className="mr-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                >
                  {showYellowPlayer
                    ? "Hide Yellow Player"
                    : "Show Yellow Player"}
                </button>

                <button
                  onClick={toggleComponent5}
                  className="mr-3 mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                >
                  {showRedPlayer ? "Hide Red Player" : "Show Red Card"}
                </button>
                <div className="flex mt-5">
                  <ColorPicker2
                    selectedColor={pageColor2}
                    onColorChange={handleColorChange2}
                  />
                  <ColorPicker
                    selectedColor={pageColor}
                    onColorChange={handleColorChange}
                  />
                </div>
              </div>

              <div className="flex-auto w-32">
                {showFormation4231Home && (
                  <button
                    onClick={toggleComponent7}
                    className="mr-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                  >
                    Formation 4231 Home
                  </button>
                )}
                {showFormation442Home && (
                  <button
                    onClick={toggleComponent8}
                    className="mr-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                  >
                    Formation 442 Home
                  </button>
                )}
                {showFormation433Home && (
                  <button
                    onClick={toggleComponent2}
                    className="mr-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                  >
                    Formation 433 Home
                  </button>
                )}

                {showFormation4231Away && (
                  <button
                    onClick={toggleComponent9}
                    className="mr-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                  >
                    Formation 4231 Away
                  </button>
                )}
                {showFormation442Away && (
                  <button
                    onClick={toggleComponent10}
                    className="mr-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                  >
                    Formation 442 Away
                  </button>
                )}
                {showFormation433Away && (
                  <button
                    onClick={toggleComponent6}
                    className="mr-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                  >
                    Formation 433 Away
                  </button>
                )}
              </div>
            </div>
            <TimerButton />

            {showGoalPlayer && <YellowPlayer />}
            {showYellowPlayer && <YellowPlayer />}
            {showRedPlayer && <YellowPlayer />}

            <div className="mt-5 flex items-center justify-center mb-5">
              <iframe
                src={IFRAME_URL}
                title="Content from localhost:3000"
                width="95%"
                height="800"
              />
            </div> */}
          </>
        );
      case "TeamScore":
        return <TeamScore />;
      case "FormationAway":
        return (
          <>
            <div className={`mt-5`}>
              <div className={`ml-9`}>
                <h2>Formation Away</h2>
                <DropdownButton
                  options={["4-4-2", "4-2-3-1", "4-3-3"]}
                  onSelect={handleFormationSelectAway}
                  label="Select Formation"
                />

                <div className="mt-5">{renderSelectedFormAway()}</div>
                {selectedFormationAway && isFormVisibleAway && (
                  <div className="mt-5 flex justify-center">
                    <button
                      onClick={handleToggleFormAway}
                      className="mr-4 bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 border border-teal-700 rounded"
                    >
                      Hide Form
                    </button>

                    <button
                      onClick={handleSubmitAway}
                      className="mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                    >
                      Submit
                    </button>

                    <button
                      onClick={handleSubmitAway}
                      className="mr-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded"
                    >
                      Cancel
                    </button>

                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                      onClick={() => createPlayerAway(newPlayer)}
                    >
                      Add Player
                    </button>
                  </div>
                )}

                {coachAway ? (
                  <div className="mt-5">
                    <form onSubmit={handleSubmitCoachAway}>
                      <label>
                        Coach:
                        <input
                          type="text"
                          value={coachAway.name || ""}
                          onChange={handleCoachNameChangeAway}
                          placeholder={coachAway[1].name}
                        />
                        <button
                          type="submit"
                          className="text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full px-3 py-2 me-2 ml-3 text-sm  bg-blue-500 hover:bg-blue-700"
                        >
                          Submit
                        </button>
                      </label>
                    </form>
                  </div>
                ) : (
                  <p>Loading...</p>
                )}
                <div className="mt-5">
                  Coach Name: {coachAway ? coachAway[1].name : "Loading..."}
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-center">
              <iframe
                src={IFRAME_URL}
                title="Content from localhost:3000"
                width="95%"
                height="800"
              />
            </div>
          </>
        );
      default:
        return (
          <>
            {/* <div className="container flex">
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

            {showGoalPlayer && <YellowPlayer />}
            {showYellowPlayer && <YellowPlayer />}
            {showRedPlayer && <YellowPlayer />}

            <div className="mt-5 flex items-center justify-center">
              <iframe
                src={IFRAME_URL}
                title="Content from localhost:3000"
                width="95%"
                height="800"
              />
            </div> */}
          </>
        );
    }
  };
  return (
    <>
      <div style={{ display: "flex", height: "100%", minHeight: "400px" }}>
        <Sidebar backgroundColor="#ffffff" width="200px">
          <Menu>
            <div className="">
              {isLoaded && user ? (
                <>
                  <div className="border border-black flex justify-center items-center p-1 mt-2 mr-4 ml-4 mb-2 rounded-lg">
                    <UserButton afterSignOutUrl="/" showName />
                  </div>
                </>
              ) : (
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  <Link href="/login">Login</Link>
                </button>
              )}
            </div>
            <MenuItem
              onClick={() => handleMenuItemClick("Control")}
              style={{
                backgroundColor:
                  selectedMenuItem === "Control" ? "#f3f3f3" : "inherit",
                color: selectedMenuItem === "Control" ? "black" : "#000000",
              }}
            >
              Control
            </MenuItem>

            <MenuItem
              onClick={() => handleMenuItemClick("FormationHome")}
              style={{
                backgroundColor:
                  selectedMenuItem === "FormationHome" ? "#F3F3F3" : "inherit",
                color:
                  selectedMenuItem === "FormationHome" ? "black" : "#000000",
              }}
            >
              Formation Home
            </MenuItem>

            <MenuItem
              onClick={() => handleMenuItemClick("FormationAway")}
              style={{
                backgroundColor:
                  selectedMenuItem === "FormationAway" ? "#F3F3F3" : "inherit",
                color:
                  selectedMenuItem === "FormationAway" ? "black" : "#000000",
              }}
            >
              {" "}
              Formation Away{" "}
            </MenuItem>

            <MenuItem
              onClick={() => handleMenuItemClick("TeamScore")}
              style={{
                backgroundColor:
                  selectedMenuItem === "TeamScore" ? "#F3F3F3" : "inherit",
                color: selectedMenuItem === "TeamScore" ? "black" : "#000000",
              }}
            >
              Team & Score
            </MenuItem>

            <MenuItem
              onClick={() => handleMenuItemClick("Subtitution")}
              style={{
                backgroundColor:
                  selectedMenuItem === "Subtitution" ? "#F3F3F3" : "inherit",
                color: selectedMenuItem === "Subtitution" ? "black" : "#000000",
              }}
            >
              Subtitution
            </MenuItem>
          </Menu>
        </Sidebar>

        <div className="flex-1" style={{ marginLeft: "10px" }}>
          {renderComponent()}
        </div>
      </div>
    </>
  );
};

export default SideBar;
