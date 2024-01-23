// hooks/useTimer.js
import { useState, useEffect } from "react";
import { useTimer } from "react-timer-hook";
import Cookies from "js-cookie";

const useCookieTimer = () => {
  const storedTime = Cookies.get("stopwatchTime");
  const initialTime = storedTime ? parseInt(storedTime, 10) : 0;

  const { seconds, restart } = useTimer({
    autoStart: false,
    initialTime,
    onExpire: () => Cookies.remove("stopwatchTime"),
  });

  useEffect(() => {
    Cookies.set("stopwatchTime", seconds, { expires: 7 });
  }, [seconds]);

  const resetTimer = () => {
    restart();
    Cookies.set("stopwatchTime", 0, { expires: 7 });
  };

  return { seconds, resetTimer };
};

export default useCookieTimer;
