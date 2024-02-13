import SelectHomeTeam from "../SelectHomeTeam";
import SelectAwayTeam from "../SelectAwayTeam";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Image from "next/image";

const TeamScore = () => {
  const [score, setScore] = useState(null);
  const [home, setHome] = useState([]);
  const [away, setAway] = useState([]);
  const [messageHome, setMessageHome] = useState("");
  const [minuteHome, setMinuteHome] = useState("");
  const [messageAway, setMessageAway] = useState("");
  const [minuteAway, setMinuteAway] = useState("");
  const [buttons, setButtons] = useState([]);
  const [teamOptions, setTeamOptions] = useState([]);
  const [selectedPlayerIn, setSelectedPlayerIn] = useState("");

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
        setButtons(response.data);
      });
    axios
      .get(`${process.env.NEXT_PUBLIC_DATABASE_URL}/playerHome`)
      .then((response) => {
        setTeamOptions(response.data);
      });
  }, []);
  if (!score) return null;

  const updateScore = () => {
    if (!score || !score.messagesHome || !score.messagesAway) {
      // Handle the case where score or its properties are null
      return;
    }

    console.log("Updated Score:", {
      ...score,
      messageHome,
      messageAway,
      minuteHome,
      minuteAway,
    });
    axios
      .put(`${process.env.NEXT_PUBLIC_DATABASE_URL}/score/${score._id}`, {
        ...score,
        messageHome,
        messageAway,
        minuteHome,
        minuteAway,
      })
      .then((response) => {
        Swal.fire({
          title: `Score updated successfully!`,
          icon: "success",
        });
      });
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

  const addMinutes = (type) => {
    if (type === "home") {
      setScore({
        ...score,
        minutesHome: [...score.minutesHome, minuteHome],
      });
      setMinuteHome("");
    } else {
      setScore({
        ...score,
        minutesAway: [...score.minutesAway, minuteAway],
      });
      setMinuteAway("");
    }
  };

  const deleteMessage = (type, index) => {
    if (type === "home") {
      const updatedMessagesHome = [...score.messagesHome];
      updatedMessagesHome.splice(index, 1);
      const updatedMinutesHome = [...score.minutesHome];
      updatedMinutesHome.splice(index, 1);
      setScore({
        ...score,
        messagesHome: updatedMessagesHome,
        minutesHome: updatedMinutesHome,
      });
    } else {
      const updatedMessagesAway = [...score.messagesAway];
      updatedMessagesAway.splice(index, 1);
      const updatedMinutesAway = [...score.minutesAway];
      updatedMinutesAway.splice(index, 1);
      setScore({
        ...score,
        messagesAway: updatedMessagesAway,
        minutesAway: updatedMinutesAway,
      });
    }
  };

  const updateMinutesHome = (index, value) => {
    const updatedMinutesHome = [...score.minutesHome];
    updatedMinutesHome[index] = value;
    setScore({
      ...score,
      minutesHome: updatedMinutesHome,
    });
  };

  const updateMinutesAway = (index, value) => {
    const updatedMinutesAway = [...score.minutesAway];
    updatedMinutesAway[index] = value;
    setScore({
      ...score,
      minutesAway: updatedMinutesAway,
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
  console.log(home);

  return (
    <>
      <div className="flex mt-4">
        <div className="border border-gray-300 p-4 rounded-l-lg flex-grow mr-4">
          {/* Content of the first div */}
          <div className="flex items-center bg-[#f0f0f0]">
            {/* Image */}
            <div className=" p-2 rounded mr-2">
              <Image src={home.logo} width={100} height={100} />
            </div>
            {/* Text */}
            <div className="flex flex-col">
              <div className="flex items-center">
                <p className="font-semibold w-24">Team:</p>
                <p>Borneo</p>
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

          <div className="border border-gray-300 p-4 rounded-r-lg flex-grow mt-4">
            <div className="py-2 px-4 font-bold"> Starting Lineup</div>
            <table className="buttons w-full">
              <tbody>
                {buttons.slice(0, 11).map((button) => (
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
        <div className="border border-gray-300 p-4 rounded-l-lg flex-grow mr-4">
          {/* Content of the first div */}
          <div className="flex items-center bg-[#f0f0f0]">
            {/* Image */}
            <div className=" p-2 rounded mr-2">
              <Image src={home.logo} width={100} height={100} />
            </div>
            {/* Text */}
            <div className="flex flex-col">
              <div className="flex items-center">
                <p className="font-semibold w-24">Team:</p>
                <p>Borneo</p>
              </div>
              <div className="flex items-center">
                <p className="font-semibold w-24">Score:</p>
                <p>0</p>
              </div>
              <div className="flex items-center">
                <p className="font-semibold w-24">Score By:</p>
                <p>Test</p>
              </div>
            </div>
          </div>

          <div className="border border-gray-300 p-4 rounded-r-lg flex-grow mt-4">
            <div>
              <h1>Score By</h1>
              <select
                onChange={(e) => handleSelectChange(e, "in")}
                value={selectedPlayerIn}
              >
                <option value="">Select Player Name</option>
                {teamOptions.slice(0, 11).map((player) => (
                  <option key={player._id} value={player.name}>
                    {player.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamScore;
