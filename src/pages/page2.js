// pages/page2.js
import React from "react";
import { useStopwatch } from "@/components/StopwatchContext";

const Page2 = () => {
  const { timerState, toggleIsRunning, resetTimer } = useStopwatch();

  return (
    <div>
      <h1>Stopwatch Page 2</h1>
      <div>
        <p>
          Time: {timerState.minutes}:{timerState.seconds}
        </p>
        <button onClick={toggleIsRunning}>
          {timerState.isRunning ? "Pause" : "Start"}
        </button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
};

export default Page2;
