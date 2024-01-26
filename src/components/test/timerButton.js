import React, { useState, useEffect } from "react";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const storedTime = localStorage.getItem("stopwatchTime");
    const storedIsRunning = localStorage.getItem("stopwatchIsRunning");

    if (storedTime) {
      setTime(parseInt(storedTime, 10));
    }

    if (storedIsRunning) {
      setIsRunning(storedIsRunning === "true");
    }
  }, []);

  useEffect(() => {
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime + 1;
          localStorage.setItem("stopwatchTime", newTime);
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const startTimer = () => {
    setIsRunning(true);
    localStorage.setItem("stopwatchIsRunning", "true");
  };

  const pauseTimer = () => {
    setIsRunning(false);
    localStorage.setItem("stopwatchIsRunning", "false");
  };

  const handleStartFromZero = () => {
    setIsRunning(false);
    setTime(0);
    localStorage.setItem("stopwatchTime", "0");
    localStorage.setItem("stopwatchIsRunning", "false");
  };

  const handleStartFrom45 = () => {
    setIsRunning(false);
    setTime(45 * 60); // 45 minutes in seconds
    localStorage.setItem("stopwatchTime", String(45 * 60));
    localStorage.setItem("stopwatchIsRunning", "false");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div id="reset-btn" style={{ fontSize: "70px" }}>
        <span>{formatTime(time)}</span>
      </div>
      {!isRunning ? (
        <button
          onClick={startTimer}
          className=" text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2  bg-blue-500 hover:bg-blue-700"
        >
          Start
        </button>
      ) : (
        <button
          className=" text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2  bg-blue-500 hover:bg-blue-700"
          onClick={pauseTimer}
        >
          Pause
        </button>
      )}

      <button
        onClick={handleStartFromZero}
        className="text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2  bg-blue-500 hover:bg-blue-700"
      >
        Start from 0
      </button>
      <button
        onClick={handleStartFrom45}
        className="text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2  bg-blue-500 hover:bg-blue-700"
      >
        Start from 45
      </button>
    </div>
  );
};

export default Stopwatch;
