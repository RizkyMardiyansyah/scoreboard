import SelectPlayerIn from "../SelectPlayerIn";
import SelectPlayerInAway from "../SelectPlayerInAway";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Arrow from "../../assets/ArrowsClockwise.png";

const SubtitutionNew = () => {
  const [home, setHome] = useState([]);
  const [away, setAway] = useState([]);
  const [score, setScore] = useState([]);
  const [selectedPlayerIn, setSelectedPlayerIn] = useState("");
  const [selectedPlayerOut, setSelectedPlayerOut] = useState("");
  const [selectedPlayerInAway, setSelectedPlayerInAway] = useState("");
  const [selectedPlayerOutAway, setSelectedPlayerOutAway] = useState("");
  const [teamOptions, setTeamOptions] = useState([]);
  const [teamOptionsAway, setTeamOptionsAway] = useState([]);
  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_DATABASE_URL}/homeTeam`)
      .then((response) => {
        setHome(response.data[0]);
      });
    axios
      .get(`${process.env.NEXT_PUBLIC_DATABASE_URL}/awayTeam`)
      .then((response) => {
        setAway(response.data[0]);
      });
    axios
      .get(`${process.env.NEXT_PUBLIC_DATABASE_URL}/score`)
      .then((response) => {
        setScore(response.data[0]);
      });
    axios
      .get(`${process.env.NEXT_PUBLIC_DATABASE_URL}/playerHome`)
      .then((response) => {
        setTeamOptions(response.data);
      });
    axios
      .get(`${process.env.NEXT_PUBLIC_DATABASE_URL}/playerAway`)
      .then((response) => {
        setTeamOptionsAway(response.data);
      });
  }, []);

  const updateScore = () => {
    if (!score || !score.messagesHome || !score.messagesAway) {
      // Handle the case where score or its properties are null
      return;
    }

    console.log("Updated Score:", { ...score, messageHome, messageAway });
    axios
      .put(`${process.env.NEXT_PUBLIC_DATABASE_URL}/score/${score._id}`, {
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

  const handleSelectChangeAway = (e, type) => {
    const selectedValue = e.target.value;

    if (type === "in") {
      setSelectedPlayerInAway(selectedValue);
    } else if (type === "out") {
      setSelectedPlayerOutAway(selectedValue);
    }
    const selectedPlayerAway = teamOptionsAway.find(
      (player) => player.name === selectedValue
    );

    if (type === "in") {
      const subPhotoUrlAway = `${process.env.NEXT_PUBLIC_DATABASE_URL}/playerAway/${selectedPlayerAway._id}/photo`;
      localStorage.setItem("subPhotoUrlAway", subPhotoUrlAway);
      localStorage.setItem("subPhotoNameAway", selectedPlayerAway.name);
      console.log("Selected Player ID:", selectedPlayerAway._id);
    } else if (type === "out") {
      const subPhotoUrl2Away = `${process.env.NEXT_PUBLIC_DATABASE_URL}/playerAway/${selectedPlayerAway._id}/photo`;
      localStorage.setItem("subPhotoName2Away", selectedPlayerAway.name);
      localStorage.setItem("subPhotoUrl2Away", subPhotoUrl2Away);
      console.log("Selected Player ID:", selectedPlayerAway._id);
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

  const handleExchangePlayersAway = () => {
    localStorage.setItem("showComponent", "12");

    // Find the IDs of the selected players
    const playerIn = teamOptionsAway.find(
      (player) => player.name === selectedPlayerInAway
    );
    const playerOut = teamOptionsAway.find(
      (player) => player.name === selectedPlayerOutAway
    );

    // Check if both players are found
    if (playerIn && playerOut) {
      // Perform the exchange in the local state
      const updatedTeamOptionsAway = [...teamOptionsAway];
      const playerInIndex = updatedTeamOptionsAway.findIndex(
        (player) => player._id === playerIn._id
      );
      const playerOutIndex = updatedTeamOptionsAway.findIndex(
        (player) => player._id === playerOut._id
      );

      if (playerInIndex !== -1 && playerOutIndex !== -1) {
        // Swap positions
        [
          updatedTeamOptionsAway[playerInIndex],
          updatedTeamOptionsAway[playerOutIndex],
        ] = [
          updatedTeamOptionsAway[playerOutIndex],
          updatedTeamOptionsAway[playerInIndex],
        ];

        // Update the local state
        setTeamOptionsAway(updatedTeamOptionsAway);

        // Update the database
        axios
          .post(`${process.env.NEXT_PUBLIC_DATABASE_URL}/playerAway/swap`, {
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
  if (!home) {
    return <p>Loading...</p>; // or any other loading indicator
  }

  return (
    <>
      <div className="flex mt-4 mb-4">
        <div className="border border-gray-300 p-4 rounded-l-lg flex-grow mr-4">
          <div className="flex items-center bg-[#f0f0f0]">
            {/* Image */}
            <div className=" p-2 rounded mr-2">
              <Image src={home.logo} width={100} height={100} />
            </div>
            {/* Text */}
            <div className="flex flex-col">
              <div className="flex items-center">
                <p className="font-semibold w-24">Team:</p>
                <p>{home.name}</p>
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

          <div class="flex justify-center mt-3">
            <div class="w-1/2 mx-2">
              <h1>Player In</h1>
              <select
                class="w-full"
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
            <Image src={Arrow} alt="Arrow" className="h-8 mt-3" />
            <div class="w-1/2 mx-2">
              <h1>Player Out</h1>
              <select
                class="w-full"
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
          </div>

          <button
            onClick={handleExchangePlayers}
            className="w-full text-white 
            bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md px-3 py-2 me-2 mt-2 text-sm  bg-blue-500 hover:bg-blue-700"
          >
            Subtitute Players
          </button>

          <div className="flex">
            <div className="border border-gray-300 p-4 rounded-r-lg flex-grow mt-4 mr-4">
              <div className="py-2 px-4 font-bold">Starting Lineup</div>
              <table className="buttons w-full">
                <tbody>
                  {teamOptions.slice(0, 11).map((button) => (
                    <tr
                      key={button.id}
                      className="border-b border-t border-gray-300"
                    >
                      <td className="col-span-full">
                        <button
                          onClick={() => handleButtonClick(button)}
                          className="w-full py-2 px-4 bg-white text-black "
                        >
                          {button.name}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border border-gray-300 p-4 rounded-r-lg flex-grow mt-4">
              <div className="py-2 px-4 font-bold">Bench Lineup</div>
              <table className="buttons w-full">
                <tbody>
                  {teamOptions.slice(11).map((button) => (
                    <tr
                      key={button.id}
                      className="border-b border-t border-gray-300"
                    >
                      <td className="col-span-full">
                        <button
                          onClick={() => handleButtonClick(button)}
                          className="w-full py-2 px-4 bg-white text-black "
                        >
                          {button.name}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="border border-gray-300 p-4 rounded-lg flex-grow mr-4">
          <div className="flex items-center bg-[#f0f0f0]">
            {/* Image */}
            <div className=" p-2 rounded mr-2">
              <Image src={away.logo} width={100} height={100} />
            </div>
            {/* Text */}
            <div className="flex flex-col">
              <div className="flex items-center">
                <p className="font-semibold w-24">Team:</p>
                <p>Bali United</p>
              </div>
              <div className="flex items-center">
                <p className="font-semibold w-24">Formation:</p>
                <p>4-4-2</p>
              </div>
              <div className="flex items-center">
                <p className="font-semibold w-24">Coach:</p>
                <p>Yeb</p>
              </div>
            </div>
          </div>

          <div class="flex justify-center mt-3">
            <div class="w-1/2 mx-2">
              <h1>Player In</h1>
              <select
                class="w-full"
                onChange={(e) => handleSelectChangeAway(e, "out")}
                value={selectedPlayerOutAway}
              >
                <option value="">Select Player In</option>
                {teamOptionsAway.slice(11).map((player) => (
                  <option key={player._id} value={player.name}>
                    {player.name}
                  </option>
                ))}
              </select>
            </div>
            <Image src={Arrow} alt="Arrow" className="h-8 mt-3" />
            <div class="w-1/2 mx-2">
              <h1>Player Out</h1>
              <select
                class="w-full"
                onChange={(e) => handleSelectChangeAway(e, "in")}
                value={selectedPlayerInAway}
              >
                <option value="">Select Player Out</option>
                {teamOptionsAway.slice(0, 11).map((player) => (
                  <option key={player._id} value={player.name}>
                    {player.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={handleExchangePlayersAway}
            className="w-full text-white 
            bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md px-3 py-2 me-2 mt-2 text-sm  bg-blue-500 hover:bg-blue-700"
          >
            Subtitute Players
          </button>

          <div className="flex">
            <div className="border border-gray-300 p-4 rounded-r-lg flex-grow mt-4 mr-4">
              <div className="py-2 px-4 font-bold">Starting Lineup</div>
              <table className="buttons w-full">
                <tbody>
                  {teamOptionsAway.slice(0, 11).map((button) => (
                    <tr
                      key={button.id}
                      className="border-b border-t border-gray-300"
                    >
                      <td className="col-span-full">
                        <button
                          onClick={() => handleButtonClick(button)}
                          className="w-full py-2 px-4 bg-white text-black "
                        >
                          {button.name}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border border-gray-300 p-4 rounded-r-lg flex-grow mt-4">
              <div className="py-2 px-4 font-bold">Bench Lineup</div>
              <table className="buttons w-full">
                <tbody>
                  {teamOptionsAway.slice(11).map((button) => (
                    <tr
                      key={button.id}
                      className="border-b border-t border-gray-300"
                    >
                      <td className="col-span-full">
                        <button
                          onClick={() => handleButtonClick(button)}
                          className="w-full py-2 px-4 bg-white text-black "
                        >
                          {button.name}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SubtitutionNew;
