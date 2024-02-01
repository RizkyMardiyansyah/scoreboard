import { useState } from "react";
import TimerButton from "../components/Timer/timerButton";
import YellowPlayer from "../components/YellowPlayer";

const Control = () => {
  const [showRedPlayer, setShowRedPlayer] = useState(false);
  const [showYellowPlayer, setShowYellowPlayer] = useState(false);
  const [showGoalPlayer, setShowGoalPlayer] = useState(false);

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
  return (
    <>
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
            {showYellowPlayer ? "Hide Yellow Player" : "Show Yellow Player"}
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
          src="http://localhost:3000/"
          title="Content from localhost:3000"
          width="95%"
          height="800"
        />
      </div>
    </>
  );
};

export default Control;
