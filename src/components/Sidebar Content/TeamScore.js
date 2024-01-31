import SelectHomeTeam from "@/components/SelectHomeTeam";
import SelectAwayTeam from "@/components/SelectAwayTeam";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const TeamScore = () => {
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
  const [selectedFormationAway, setSelectedFormationAway] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [isFormVisibleAway, setIsFormVisibleAway] = useState(true);
  const [data, setData] = useState(null);
  const [coachAway, setCoachAway] = useState(null);
  const [messageHome, setMessageHome] = useState("");
  const [messageAway, setMessageAway] = useState("");
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const handleTabSelect = (index) => {
    setSelectedTabIndex(index);
  };

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
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/coach");
        setCoachAway(response.data);
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

  const updateScore = () => {
    if (!score || !score.messagesHome || !score.messagesAway) {
      // Handle the case where score or its properties are null
      return;
    }

    console.log("Updated Score:", { ...score, messageHome, messageAway });
    axios
      .put(`http://localhost:8000/score/${score._id}`, {
        ...score,
        messageHome,
        messageAway,
      })
      .then((response) => {
        Swal.fire({
          title: `Score updated successfully!`,
          icon: "success",
        });
      });
  };

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
          axios.put(`http://localhost:8000/playerAway/${_id}`, { name, no })
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
      await axios.put(`http://localhost:8000/coach/${coachId}`, updatedData);

      // Fetch the latest data after the update
      const response = await axios.get("http://localhost:8000/coach");
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
      await axios.put(`http://localhost:8000/coach/${coachId}`, updatedData);

      // Fetch the latest data after the update
      const response = await axios.get("http://localhost:8000/coach");
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
                    <Image
                      src={`http://localhost:8000/playerHome/${player._id}/photo`}
                      alt={`Player ${player.name}`}
                      width={45}
                      height={45}
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
                    <Image
                      src={`http://localhost:8000/playerHome/${player._id}/photo`}
                      alt={`Player ${player.name}`}
                      width={45}
                      height={45}
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
                    <Image
                      src={`http://localhost:8000/playerHome/${player._id}/photo`}
                      alt={`Player ${player.name}`}
                      width={45}
                      height={45}
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
  const renderForms442Away = () => {
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
          await axios.delete(`http://localhost:8000/playerAway/${playerId}`);

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
          `http://localhost:8000/playerAway/${newPlayerAway[index]._id}/photo`,
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
              <td className="px-4 py-2">{getPlayerPosition(index)}</td>
              <td className="px-4 py-2">
                <div className="relative mt-2 rounded-md shadow-sm">
                  <input
                    type="text"
                    value={player.name}
                    onChange={(e) => handleInputChangeAway(e, index)}
                    className="rounded-md border-0 py-1.5 pl-7 pr-20 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </td>
              <td className="px-4 py-2">
                <div className="relative mt-2 rounded-md shadow-sm">
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
                      src={`http://localhost:8000/playerAway/${player._id}/photo`}
                      alt={`Player ${player.name}`}
                      width={45}
                      height={45}
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
        "http://localhost:8000/playerAway",
        formData
      );

      const createdPlayer = response.data;

      // Fetch the updated list of players
      const updatedResponse = await axios.get(
        "http://localhost:8000/playerAway"
      );
      const updatedPlayers = updatedResponse.data;

      // Update state with the new list of players
      setPlayerAway(updatedPlayers);
    } catch (error) {
      console.error("Error creating player:", error);
    }
  };

  const addMessage = (type) => {
    if (type === "home") {
      setScore({
        ...score,
        messagesHome: [...score.messagesHome, messageHome],
      });
      setMessageHome("");
    } else {
      setScore({
        ...score,
        messagesAway: [...score.messagesAway, messageAway],
      });
      setMessageAway("");
    }
  };

  const deleteMessage = (type, index) => {
    if (type === "home") {
      const updatedMessagesHome = [...score.messagesHome];
      updatedMessagesHome.splice(index, 1);
      setScore({ ...score, messagesHome: updatedMessagesHome });
    } else {
      const updatedMessagesAway = [...score.messagesAway];
      updatedMessagesAway.splice(index, 1);
      setScore({ ...score, messagesAway: updatedMessagesAway });
    }
  };

  return (
    <div className="bg-slate-300 flex justify-evenly mt-5 ml-9">
      <div className="flex-auto w-16">
        <div className="mr-3">
          <SelectHomeTeam />
        </div>
        <div className="mr-3">
          <SelectAwayTeam />
        </div>
      </div>

      <div className="flex-auto bg-slate-300">
        <h1 className="p-2 text-black">Score</h1>

        <label
          htmlFor="home"
          className="block text-sm font-medium leading-6 text-black"
        >
          {home.name}
        </label>
        <div className="mt-2 mb-4">
          <span className="text-black">{score.home}</span>
        </div>

        <label
          htmlFor="away"
          className="block text-sm font-medium leading-6 text-black"
        >
          {away.name}
        </label>
        <div className="mt-2 mb-4">
          <span className="text-black">{score.away}</span>
        </div>

        <div>
          <label
            htmlFor="messageHome"
            className="block text-sm font-medium leading-6 text-black"
          >
            Goalscorer for {home.name}
          </label>

          {score.messagesHome && score.messagesHome.length > 0 && (
            <>
              {score.messagesHome.map((message, index) => (
                <div
                  key={index}
                  className="relative mt-2 mb-4 rounded-md shadow-sm"
                >
                  <input
                    type="text"
                    name={`messageHome_${index}`}
                    id={`messageHome_${index}`}
                    value={message}
                    placeholder="Haaland 20'"
                    className="rounded-md border-0 py-1.5 pl-7 pr-20 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => {
                      const updatedMessagesHome = [...score.messagesHome];
                      updatedMessagesHome[index] = e.target.value;
                      setScore({
                        ...score,
                        messagesHome: updatedMessagesHome,
                      });
                    }}
                  />
                  <button
                    onClick={() => deleteMessage("home", index)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
                  >
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </>
          )}

          <div className="relative mt-2 mb-4">
            <button
              onClick={() => addMessage("home")}
              className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
            >
              Add Score
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="messageAway"
            className="block text-sm font-medium leading-6 text-black"
          >
            Goalscorer for {away.name}
          </label>

          {score.messagesAway && score.messagesAway.length > 0 && (
            <>
              {score.messagesAway.map((message, index) => (
                <div
                  key={index}
                  className="relative mt-2 mb-4 rounded-md shadow-sm"
                >
                  <input
                    type="text"
                    name={`messageAway_${index}`}
                    id={`messageAway_${index}`}
                    placeholder="Haaland 20'"
                    value={message}
                    className="rounded-md border-0 py-1.5 pl-7 pr-20 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => {
                      const updatedMessagesAway = [...score.messagesAway];
                      updatedMessagesAway[index] = e.target.value;
                      setScore({
                        ...score,
                        messagesAway: updatedMessagesAway,
                      });
                    }}
                  />
                  <button
                    onClick={() => deleteMessage("away", index)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
                  >
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </>
          )}

          <div className="relative mt-2 mb-4">
            <button
              onClick={() => addMessage("away")}
              className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
            >
              Add Score
            </button>
          </div>
        </div>

        <button
          className="my-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={updateScore}
        >
          Update Score
        </button>
      </div>
    </div>
  );
};

export default TeamScore;
