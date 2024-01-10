import React from "react";
import { useStopwatch } from "react-timer-hook";

export function MyStopwatch() {
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false });

  return (
    <div style={{ textAlign: "center" }}>
      <div id="reset-btn" style={{ fontSize: "70px", color: "white" }}>
        <span>{minutes}</span>:<span>{seconds}</span>
      </div>

      <button style={{ color: "white" }} onClick={start}>
        Start
      </button>
      <button style={{ color: "white" }} onClick={pause}>
        Pause
      </button>
      <button style={{ color: "white" }} onClick={reset}>
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
