import React, { useEffect } from "react";
import { useStopwatch } from "react-timer-hook";
import io from "socket.io-client";

const socket = io("http://localhost:8000"); // Update with your Socket.IO server URL and port

export function MyStopwatch() {
  // Retrieve the initial timer state from localStorage
  const initialState = JSON.parse(localStorage.getItem("timerState")) || {
    totalSeconds: 0,
    isRunning: false,
  };

  const { totalSeconds, seconds, minutes, isRunning, start, pause, reset } =
    useStopwatch({
      autoStart: initialState.isRunning,
      initialTimestamp: initialState.totalSeconds * 1000,
    });

  useEffect(() => {
    socket.on("start", () => {
      start();
    });

    socket.on("stop", () => {
      pause();
    });

    // Cleanup: Remove event listeners when component unmounts
    return () => {
      socket.off("start");
      socket.off("stop");
    };
  }, [start, pause]);

  // Store the current timer state in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "timerState",
      JSON.stringify({ totalSeconds, isRunning })
    );
  }, [totalSeconds, isRunning]);

  return (
    <div style={{ textAlign: "center" }}>
      <div id="reset-btn" style={{ fontSize: "70px", color: "white" }}>
        <span>{minutes}</span>:<span>{seconds}</span>
      </div>

      <button
        style={{ color: "white" }}
        onClick={() => {
          socket.emit("start");
        }}
      >
        Start
      </button>
      <button
        style={{ color: "white" }}
        onClick={() => {
          socket.emit("stop");
        }}
      >
        Pause
      </button>
      <button
        style={{ color: "white" }}
        onClick={() => {
          socket.emit("stop");
          reset();
        }}
      >
        Reset
      </button>
    </div>
  );
}

export default function Timer() {
  return (
    <div>
      <MyStopwatch />
    </div>
  );
}
