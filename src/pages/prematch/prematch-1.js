import Image from "next/image";
import React, { useEffect, useState } from "react";
import Back from "../../assets/caret-left.png";
import axios from "axios";
import SelectHomeTeam from "../../components/SelectHomeTeam";
import Swal from "sweetalert2";
import DropdownButton from "../../components/Dropdown";
import Control from "../../components/Sidebar Content/Control";
import { useRouter } from "next/router";
import Link from "next/link";
import Forms from "../../components/Formation/Forms";
import Upload from "../../assets/UploadSimple.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  const [selectedHomeTeam, setSelectedHomeTeam] = useState('');

  const url = 'playerHome';
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const teamResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_DATABASE_URL}/team`
      );
      setHome(teamResponse.data);

      const coachResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_DATABASE_URL}/coach`
      );
      setCoach(coachResponse.data[0]);

      const playerResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_DATABASE_URL}/player`
      );
      setPlayerHome(playerResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCoachNameChange = (event) => {
    const newName = event.target.value;
    setCoach((prevData) => ({
      ...prevData,
      name: newName,
    }));

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
      const clearPhotoPromises = [];

      const updatedPlayerHome = await Promise.all(
          playerHome.map(async (player) => {
            if (player.photo) {
              const clearPhotoPromise = axios.put(
                  `${process.env.NEXT_PUBLIC_DATABASE_URL}/player/${player._id}/photoDelete`
              );
              clearPhotoPromises.push(clearPhotoPromise);
            }
            return {
              ...player,
              name: "",
              no: "",
              photo: null,
            };
          })
      );

      await Promise.all(clearPhotoPromises);
      setPlayerHome(updatedPlayerHome);

      console.log("All player data cleared successfully!");
    } catch (error) {
      console.error("Error clearing player data:", error);
    }
  };

  const handleSubmit = async () => {
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

      const formData = new FormData();
      formData.append("name", newPlayer.name);
      formData.append("no", newPlayer.no);
      formData.append("Position", newPlayer.Position || "");

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
      const updatedPlayers = updatedResponse.data;

      setPlayerHome(updatedPlayers);
    } catch (error) {
      console.error("Error creating player:", error);
    }
  };

  const filterPlayersByHomeTeam = (teamName) => {
    if (!teamName) {
      return;
    }
    const filteredPlayers = playerHome.filter(player => player.team === teamName);
    setPlayerHome(filteredPlayers);
  };

  const handleFormationSelect = async (formation) => {
    setSelectedFormation(formation);

    try {
      await axios.put(
          `${process.env.NEXT_PUBLIC_DATABASE_URL}/homeTeam/65a4c43b781814cf4206a691`,
          {
            formation: formation,
          }
      );

      console.log("Formation saved to database:", formation);
    } catch (error) {
      console.error("Error saving formation to database:", error);
    }

    setSelectedFormation(formation);
    setIsFormVisible(true);

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
    filterPlayersByHomeTeam(selectedHomeTeam);
  };

  const renderSelectedForm = () => {
    if (!isFormVisible) {
      return null;
    }

    const formationMap = {
      "4-4-2": [
        "GK", "LB", "CB", "CB", "RB", "LM", "CM", "CM", "RM", "CF",
        "CF", "S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9",
        "S10", "S11"
      ],
      "4-2-3-1": [
        "GK", "LB", "CB", "CB", "RB", "CM", "CM", "LW", "AM", "RW",
        "CF", "S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9",
        "S10", "S11"
      ],
      "4-3-3": [
        "GK", "LB", "CB", "CB", "RB", "DM", "CM", "CM", "LW", "RW",
        "CF", "S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9",
        "S10", "S11"
      ]
    };

    return Forms(
        formationMap[selectedFormation] || [],
        playerHome,
        setPlayerHome,
        url
    );
  };
  return (
      <>
        <div className="py-4">
          <div className="flex border-b">
            <div className="flex mb-4 text-xl font-bold">
              <Link href="/admin">
                <div className="p-1 ml-4 mr-4 border rounded-md">
                  <Image src={Back} width={20} height={20} />
                </div>
              </Link>
              Create New Match
            </div>
          </div>

          <div className="px-3 py-6">
            <div className="flex">
              <div className="flex-col px-6">
                <h1 className="text-xl font-bold">New Match</h1>
                  <h1>Please provide complete and accurate information for all required fields.</h1>
              </div>
              <div className="flex justify-end flex-grow h-10 px-6">
                <button
                    className="bg-[#5786E3] hover:bg-blue-600 text-white font-bold py-2 px-4 border border-yellow-700 rounded w-36"
                    onClick={handleSubmit}
                >
                  Next
                </button>
              </div>
            </div>

            <div className="flex">
              <div className="flex-grow w-2/5 px-6 py-6">
                <div className="p-5 border rounded-md">
                  <h1 className="text-xl font-semibold">Home Team</h1>
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
                                value={coach.name || ""}
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

                  <div className="mt-5">{renderSelectedForm()}</div>
                  {selectedFormation && isFormVisible && (
                      <div className="flex justify-center mt-5 ml-5">
                        <button
                            className="px-4 py-2 font-bold text-white bg-blue-500 border border-blue-700 rounded hover:bg-blue-700"
                            onClick={() => createPlayer(newPlayer)}
                        >
                          Add Player
                        </button>
                        <button
                            className="px-4 py-2 mr-4 font-bold text-white bg-red-500 border border-red-700 rounded hover:bg-red-700"
                            onClick={handleClearAllForm}
                        >
                          Clear All
                        </button>
                      </div>
                  )}
                </div>
              </div>
              <div className="flex-1 px-6 py-6">
                <div className="p-4 border rounded-md">
                  {home.length > 0 && (
                      <div className="flex">
                        <div className="mr-2">
                          <Image
                              src={`data:image/png;base64,${Buffer.from(
                                  home[0].logo.data
                              ).toString("base64")}`}
                              width={100}
                              height={100}
                          />
                        </div>
                        <div className="flex flex-col justify-center ml-9">
                          <div className="flex">
                            <p className="w-24 font-semibold">Team:</p>
                            <p>{home[0].name}</p>
                          </div>
                          <div className="flex mt-2">
                            <p className="w-24 font-semibold">Formation:</p>
                            <p>{selectedFormation}</p>
                          </div>
                          <div className="flex mt-2">
                            <p className="w-24 font-semibold">Coach:</p>
                            {coach ? (
                                <p>{coach.name}</p>
                            ) : (
                                <p>Loading...</p>
                            )}
                          </div>
                        </div>
                      </div>
                  )}
                </div>
                <div className="mt-4">
                  <div className="bg-[#F3F3F3] rounded-md">
                    <p className="p-6 italic">
                      Note: Ensure your lineup reflects your strategy and preferences before the match begins. Need assistance? Contact support at support@example.com.
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
