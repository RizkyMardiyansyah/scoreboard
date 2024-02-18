import Image from "next/image";
import React, { useEffect, useState } from "react";
import "react-tabs/style/react-tabs.css";
import Back from "../../assets/caret-left.png";
import axios from "axios";
import Upload from "../../assets/UploadSimple.png";
import Plus from "../../assets/PlusWhite.png";
import SelectAwayTeam from "../../components/SelectAwayTeam";
import SelectFormationHome from "../../components/SelectFormationHome";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import DropdownButton from "../../components/Dropdown";
import Control from "../../components/Sidebar Content/Control";
import { useRouter } from "next/router";

const Prematch2 = () => {
  const [away, setAway] = useState([]);
  const [coach, setCoach] = useState(null);
  const [selectedFormation, setSelectedFormation] = useState(null);
  const [playerAway, setPlayerAway] = useState([]);
  const [showFormation442Away, setShowFormation442Away] = useState(false);
  const [showFormation4231Away, setShowFormation4231Away] = useState(false);
  const [showFormation433Away, setShowFormation433Away] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [showForm1, setShowForm1] = useState(false);
  const [showForm2, setShowForm2] = useState(false);
  const [showForm3, setShowForm3] = useState(false);
  const router = useRouter();

  const fetchData = async () => {
    try {
      // Fetch home team data
      const awayResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/awayTeam`
      );
      setAway(awayResponse.data[0]);

      // Fetch coach data
      const coachResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/coach`
      );
      setCoach(coachResponse.data[1]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Fetch initial data when the component mounts
    fetchData();

    const intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchPlayerAway = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_DATABASE_URL}/playerAway`
        );
        setPlayerAway(response.data);
      } catch (error) {
        console.error("Error fetching player Away data:", error);
      }
    };

    fetchPlayerAway();
  }, []);

  const handleCoachNameChange = (event) => {
    const newName = event.target.value;
    setCoach((prevData) => ({
      ...prevData,
      name: newName,
    }));

    // Make an HTTP request to update the coach's name in the database
    axios
      .put(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/coach/65aa2055672025c87a76f5d3`,
        {
          name: newName,
        }
      )
      .then((response) => {
        console.log("Coach name updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating coach name:", error);
      });
  };

  //  formation
  const handleInputChange = (e, index) => {
    const updatedPlayerAway = [...playerAway];
    updatedPlayerAway[index].name = e.target.value;
    setPlayerAway(updatedPlayerAway);
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
        const promises = playerAway.map(async ({ _id, name, no, photo }) => {
          // Update player data
          await axios.put(
            `${process.env.NEXT_PUBLIC_DATABASE_URL}/playerAway/${_id}`,
            { name }
          );

          // Update player photo if it exists
          if (photo) {
            const formData = new FormData();
            formData.append("file", photo);

            await axios.put(
              `${process.env.NEXT_PUBLIC_DATABASE_URL}/playerAway/${_id}/photo`,
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
        router.push("/prematch/prematchFinal");
      } catch (error) {
        Swal.fire({
          title: `Error updating players ${error}`,
          icon: "error",
        });
        console.error("Error updating players:", error);
      }
    }
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
  const handleFormationSelect = async (formation) => {
    setSelectedFormation(formation); // Update selected formation in state

    try {
      // Perform database update
      await axios.put(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/awayTeam/65a4cbb0a5c2cc43008bbe79`,
        {
          formation: formation,
        }
      );

      console.log("Formation saved to database:", formation);
    } catch (error) {
      console.error("Error saving formation to database:", error);
      // Handle error if necessary
    }

    setSelectedFormation(formation);
    setIsFormVisible(true);

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
    const stateProps = {
      showFormation442Away,
      setShowFormation442Away,
      showFormation4231Away,
      setShowFormation4231Away,
      showFormation433Away,
      setShowFormation433Away,
    };
    return <Control {...stateProps} />;
  };
  const renderSelectedForm = () => {
    if (!isFormVisible) {
      return null;
    }

    if (selectedFormation === "4-4-2") {
      return renderForms442Away();
    } else if (selectedFormation === "4-2-3-1") {
      return renderForms4231Away();
    } else if (selectedFormation === "4-3-3") {
      return renderForms433Away();
    }
    return null; // Return null if no formation is selected
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
      <div className="mt-4 border rounded-md">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Position</th>
              <th className="px-4 py-2">Player Name</th>

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
                      onChange={(e) => handleInputChange(e, index)}
                      className="rounded-md border-0 py-1.5 pl-7 pr-20 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
      </div>
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
      <div className="mt-4 border rounded-md">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Position</th>
              <th className="px-4 py-2">Player Name</th>

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
                      onChange={(e) => handleInputChange(e, index)}
                      className="rounded-md border-0 py-1.5 pl-7 pr-20 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
      </div>
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
      <div className="mt-4 border rounded-md">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Position</th>
              <th className="px-4 py-2">Player Name</th>

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
                      onChange={(e) => handleInputChange(e, index)}
                      className="rounded-md border-0 py-1.5 pl-7 pr-20 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
      </div>
    );
  };

  return (
    <>
      <div className="py-4">
        <div className="border-b flex ">
          <div className="mb-4 font-bold text-xl">
            <button className="ml-4 border p-1 mr-4 rounded-md">
              <Image src={Back} width={20} height={20} />
            </button>
            Create New Match
          </div>
        </div>

        <div className="px-3 py-6 ">
          <div className="flex">
            <div className="px-6 flex-col ">
              <h1 className="text-xl font-bold">New Match</h1>
              <h1>
                Please provide complete and accurate information for all
                required fields.
              </h1>
            </div>
            <div className="flex justify-end flex-grow h-10  px-6">
              <button
                className="bg-[#5786E3] hover:bg-blue-600 text-white font-bold py-2 px-4 border border-yellow-700 rounded w-36"
                onClick={handleSubmit}
              >
                Next
              </button>
            </div>
          </div>

          <div className="flex">
            <div className="px-6 py-6 flex-grow">
              <div className="border rounded-md p-5 ">
                <h1 className="font-semibold text-xl">Away Team</h1>
                <div className="mt-4">
                  <h1 className="font-semibold">Select Team</h1>
                  <SelectAwayTeam />
                </div>
                <div className="mt-4">
                  <h1 className="font-semibold">Choose Formation</h1>
                  <DropdownButton
                    options={["4-4-2", "4-2-3-1", "4-3-3"]}
                    onSelect={handleFormationSelect}
                    label="Select Formation"
                  />
                </div>

                <div className="mt-4">
                  <h1 className="font-semibold">Coach in Charge</h1>
                  {coach ? (
                    <div className="mt-2">
                      <form>
                        <input
                          type="text"
                          // value={coach.name || ""}
                          className="rounded-md border-0 py-1.5 pl-2 text-black ring-1 ring-gray-300 placeholder:text-gray-400 w-full"
                          onChange={handleCoachNameChange}
                          placeholder="Coach Name"
                        />
                      </form>
                    </div>
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>

                {/* OLD PLAYER */}
                {/* <div className="mt-4 flex flex-col">
                  <label htmlFor="playerName" className="font-semibold">
                    Player Name
                  </label>
                  <div className="flex justify-between">
                    <input
                      name={`playerName`}
                      placeholder="Player Name"
                      type="text"
                      className="rounded-md border-0 py-1.5 pl-2 text-black ring-1 ring-gray-300 placeholder:text-gray-400 mr-2 w-8/12"
                    />
                    <button className="bg-[#F3F3F3] hover:bg-neutral-300 text-black font-semibold py-2 px-4 rounded flex justify-center ">
                      <Image
                        src={Upload}
                        width={20}
                        height={20}
                        className="mr-3"
                      />
                      Upload
                    </button>

                    <button className="bg-[#5786E3] hover:bg-blue-600 text-white font-semibold  py-2 px-4 border rounded flex justify-center">
                      <Image
                        src={Plus}
                        width={20}
                        height={20}
                        className="mr-3"
                      />
                      Add Player
                    </button>
                  </div>
                </div> */}

                <div className="mt-5 ">{renderSelectedForm()}</div>
                {selectedFormation && isFormVisible && (
                  <div className="mt-5 ml-5 flex justify-center">
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
                  </div>
                )}
              </div>
            </div>

            <div className="px-6 py-6 flex-1">
              <div className="border rounded-md p-4 ">
                <div className="flex ">
                  <div className=" mr-2">
                    <Image src={away.logo} width={100} height={100} />
                  </div>
                  {/* Text */}
                  <div className="flex flex-col justify-center ml-9">
                    <div className="flex">
                      <p className="font-semibold w-24">Team:</p>
                      <p className="">{away.name}</p>
                    </div>
                    <div className="flex mt-2">
                      <p className="font-semibold w-24">Formation:</p>
                      <p className="">{selectedFormation}</p>
                    </div>
                    <div className="flex mt-2">
                      <p className="font-semibold w-24">Coach:</p>
                      {/* <p className="ml-9">coach</p> */}
                      {coach ? (
                        <p className="">{coach.name}</p>
                      ) : (
                        <p>Loading...</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 ">
                <div className=" bg-[#F3F3F3] rounded-md">
                  <p className="p-6 italic ">
                    Note: Ensure your lineup reflects your strategy and
                    preferences before the match begins. Need assistance?
                    Contact support at support@example.com.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Prematch2;
