import Image from "next/image";
import React, { useEffect, useState } from "react";
import Back from "../../assets/caret-left.png";
import axios from "axios";
import Upload from "../../assets/UploadSimple.png";
import Plus from "../../assets/PlusWhite.png";
import SelectHomeTeam from "../../components/SelectHomeTeam";
import SelectFormationHome from "../../components/SelectFormationHome";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import DropdownButton from "../../components/Dropdown";
import Control from "../../components/Sidebar Content/Control";
import { useRouter } from "next/router";
import Link from "next/link";
import Forms from "../../components/Formation/Forms";

const Prematch1 = () => {
  const [home, setHome] = useState([]);
  const [coach, setCoach] = useState(null);
  const [selectedFormation, setSelectedFormation] = useState(null);
  const [playerHome, setPlayerHome] = useState([]);
  const [showFormation442Home, setShowFormation442Home] = useState(false);
  const [showFormation4231Home, setShowFormation4231Home] = useState(false);
  const [showFormation433Home, setShowFormation433Home] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [showForm1, setShowForm1] = useState(false);
  const [showForm2, setShowForm2] = useState(false);
  const [showForm3, setShowForm3] = useState(false);
  const router = useRouter();
  const [imageKey, setImageKey] = useState(0);

  const fetchData = async () => {
    try {
      // Fetch home team data
      const homeResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_DATABASE_URL}/homeTeam`
      );
      setHome(homeResponse.data[0]);

      // Fetch coach data
      const coachResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_DATABASE_URL}/coach`
      );
      setCoach(coachResponse.data[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const url = 'playerHome';

  useEffect(() => {
    // Fetch initial data when the component mounts
    fetchData();

    const intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchPlayerHome = async () => {
      try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_DATABASE_URL}/player`
        );
        const homeResponse = await axios.get(
            `${process.env.NEXT_PUBLIC_DATABASE_URL}/homeTeam`
        );
        const data = response.data;
        setPlayerHome(
            data.filter((player) => player.team === homeResponse.data[0].name)
        );
      } catch (error) {
        console.error("Error fetching player home data:", error);
      }
    };

    fetchPlayerHome();
  }, []);
  const newPlayer = {
    name: "",
    no: "",
    Position: "",
    team: home.name || "",
  }

  const refetchImage = () => {
    setImageKey((prevKey) => prevKey + 1);
  };

  const handleCoachNameChange = (event) => {
    const newName = event.target.value;
    setCoach((prevData) => ({
      ...prevData,
      name: newName,
    }));

    // Make an HTTP request to update the coach's name in the database
    axios
        .put(
            `${process.env.NEXT_PUBLIC_DATABASE_URL}/coach/65aa203d672025c87a76f5d0`,
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

  const handleClearAllForm = async () => {
    try {
      // Create an array to store all the promises for clearing photos
      const clearPhotoPromises = [];

      // Iterate over each player in the array
      const updatedPlayerHome = await Promise.all(
          playerHome.map(async (player) => {
            // Clear the photo on the server if it exists
            if (player.photo) {
              const clearPhotoPromise = axios.put(
                  `${process.env.NEXT_PUBLIC_DATABASE_URL}/player/${player._id}`
              );
              clearPhotoPromises.push(clearPhotoPromise);
            }
            // Reset the player data to empty values
            return {
              ...player,
              name: "",
              no: "",
              photo: null,
            };
          })
      );

      // Wait for all photo deletion promises to resolve
      await Promise.all(clearPhotoPromises);

      // Update the state with the new array of players
      setPlayerHome(updatedPlayerHome);

      console.log("All player data cleared successfully!");
    } catch (error) {
      console.error("Error clearing player data:", error);
    }
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
        const promises = playerHome.map(async ({ _id, name, no }) => {
          // Update player data
          await axios.put(
              `${process.env.NEXT_PUBLIC_DATABASE_URL}/player/${_id}`,
              { name, no }
          );
        });

        await Promise.all(promises);

        Swal.fire({
          title: "All players updated successfully!",
          icon: "success",
        });
        console.log("All players updated successfully!");
        router.push("/prematch/prematch-2");
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
      formData.append("team", home.name || "");

      // If there's a photo, append it to FormData
      if (newPlayer.photo) {
        formData.append("file", newPlayer.photo);
      }

      const response = await axios.post(
          `${process.env.NEXT_PUBLIC_DATABASE_URL}/player`,
          formData
      );
      const createdPlayer = response.data;
      const updatedResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_DATABASE_URL}/player`
      );
      const homeResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_DATABASE_URL}/homeTeam`
      );
      const data = updatedResponse.data;
      setPlayerHome(
          data.filter((player) => player.team === homeResponse.data[0].name)
      );
      // Fetch the updated list of players
    } catch (error) {
      console.error("Error creating player:", error);
    }
  };

  const handleFormationSelect = async (formation) => {
    setSelectedFormation(formation); // Update selected formation in state
    try {
      // Perform database update
      await axios.put(
          `${process.env.NEXT_PUBLIC_DATABASE_URL}/homeTeam/65a4c43b781814cf4206a691`,
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
  const renderSelectedForm = () => {
    if (!isFormVisible) {
      return null;
    }

    const formationMap = {
      "4-4-2": ["GK", "LB", "CB", "CB", "RB", "LM", "CM", "CM", "RM", "CF", "CF", "S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9", "S10", "S11"],
      "4-2-3-1": ["GK", "LB", "CB", "CB", "RB", "CM", "CM", "LW", "AM", "RW", "CF", "S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9", "S10", "S11"],
      "4-3-3": ["GK", "LB", "CB", "CB", "RB", "DM", "CM", "CM", "LW", "RW", "CF", "S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9", "S10", "S11"]
    };

    return Forms(formationMap[selectedFormation] || [], playerHome, setPlayerHome, url);

  };



  return (
      <>
        <div className="py-4">
          <div className="border-b flex ">
            <div className="mb-4 font-bold text-xl flex">
              <Link href="/admin">
                <div className="ml-4 border p-1 mr-4 rounded-md">
                  <Image src={Back} width={20} height={20} />
                </div>
              </Link>
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
              <div className="px-6 py-6 flex-grow w-2/5">
                <div className="border rounded-md p-5 ">
                  <h1 className="font-semibold text-xl">Home Team</h1>
                  <div className="mt-4">
                    <h1 className="font-semibold">Select Team</h1>
                    <SelectHomeTeam />
                  </div>
                  <div className="mt-4">
                    <h1 className="font-semibold">Choose Formation</h1>
                    <DropdownButton
                        options={["4-4-2", "4-2-3-1", "4-3-3"]}
                        onSelect={handleFormationSelect}
                        label={selectedFormation || "Select Formation"}
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
                      <Image src={home.logo} width={100} height={100} />
                    </div>
                    {/* Text */}
                    <div className="flex flex-col justify-center ml-9">
                      <div className="flex">
                        <p className="font-semibold w-24">Team:</p>
                        <p className="">{home.name}</p>
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
export default Prematch1;