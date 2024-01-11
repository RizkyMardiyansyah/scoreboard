// FootballFormation.js

import React from "react";
import styles from "@/styles/goal.module.css";
import yellowcard from "@/assets/yellow-card.gif";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import GoalGif from "@/assets/futuboalhafoari.gif";

const Goal = () => {
  const [buttons, setButtons] = useState([]);
  const [buttonsAway, setButtonsAway] = useState([]);

  React.useEffect(() => {
    axios.get("http://localhost:5500/playerHome").then((response) => {
      setButtons(response.data);
    });
    axios.get("http://localhost:5500/playerAway").then((response) => {
      setButtonsAway(response.data);
    });
  }, []);
  const clickedButton = localStorage.getItem("clickedButton");
  console.log("Clicked Button:", clickedButton);
  return (
    <div className={`scoreboard`}>
      <div className="text-white">{clickedButton}</div>
      <div className={styles.goal}>
        <Image src={GoalGif} />
      </div>
      <div className="text-white text-right">{clickedButton}</div>
    </div>
  );
};

export default Goal;
