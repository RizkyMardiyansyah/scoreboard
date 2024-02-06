import SelectHomeTeam from "../SelectHomeTeam";
import SelectAwayTeam from "../SelectAwayTeam";
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const TeamScore = () => {
  const [score, setScore] = useState(null);
  const [home, setHome] = useState([]);
  const [away, setAway] = useState([]);
  const [messageHome, setMessageHome] = useState("");
  const [minuteHome, setMinuteHome] = useState("");
  const [messageAway, setMessageAway] = useState("");
  const [minuteAway, setMinuteAway] = useState("");

  React.useEffect(() => {
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

  return (
    <div className="bg-slate-300 flex justify-evenly mt-5 ml-9 min-h-screen">
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

          <table className="min-w-full border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Minute</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {score.messagesHome && score.messagesHome.length > 0 && (
                <>
                  {score.messagesHome.map((message, index) => (
                    <tr key={index}>
                      {/* Name input */}
                      <td className="border border-gray-300 px-4 py-2 flex items-center justify-center">
                        <input
                          type="text"
                          name={`messageHome_${index}`}
                          id={`messageHome_${index}`}
                          value={message}
                          placeholder="Haaland"
                          className="rounded-md border-0 py-1.5 pl-2 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={(e) => {
                            const updatedMessagesHome = [...score.messagesHome];
                            updatedMessagesHome[index] = e.target.value;
                            setScore({
                              ...score,
                              messagesHome: updatedMessagesHome,
                            });
                          }}
                        />
                      </td>

                      {/* Minute input */}
                      <td className="border border-gray-300 px-4 py-2 text-center align-middle">
                        <input
                          type="text"
                          name={`minutesHome_${index}`}
                          id={`minutesHome_${index}`}
                          value={score.minutesHome[index] || ""}
                          placeholder="20'"
                          className="rounded-md border-0 py-1.5 pl-2 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={(e) =>
                            updateMinutesHome(index, e.target.value)
                          }
                        />
                      </td>

                      {/* Delete button */}
                      <td className="border border-gray-300 px-4 py-2 text-center align-middle">
                        <button
                          onClick={() => deleteMessage("home", index)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-700 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>

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

          <table className="min-w-full border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Minute</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {score.messagesAway && score.messagesAway.length > 0 && (
                <>
                  {score.messagesAway.map((message, index) => (
                    <tr key={index}>
                      {/* Name input */}
                      <td className="border border-gray-300 px-4 py-2 flex items-center justify-center">
                        <input
                          type="away"
                          name={`messageAway_${index}`}
                          id={`messageAway_${index}`}
                          value={message}
                          placeholder="Haaland"
                          className="rounded-md border-0 py-1.5 pl-2 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={(e) => {
                            const updatedMessagesAway = [...score.messagesAway];
                            updatedMessagesAway[index] = e.target.value;
                            setScore({
                              ...score,
                              messagesAway: updatedMessagesAway,
                            });
                          }}
                        />
                      </td>

                      {/* Minute input */}
                      <td className="border border-gray-300 px-4 py-2 text-center align-middle">
                        <input
                          type="away"
                          name={`minutesAway_${index}`}
                          id={`minutesAway_${index}`}
                          value={score.minutesAway[index] || ""}
                          placeholder="20'"
                          className="rounded-md border-0 py-1.5 pl-2 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={(e) =>
                            updateMinutesAway(index, e.target.value)
                          }
                        />
                      </td>

                      {/* Delete button */}
                      <td className="border border-gray-300 px-4 py-2 text-center align-middle">
                        <button
                          onClick={() => deleteMessage("away", index)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-700 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>

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
