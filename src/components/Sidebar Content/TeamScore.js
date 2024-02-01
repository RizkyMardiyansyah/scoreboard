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
  const [messageAway, setMessageAway] = useState("");

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
