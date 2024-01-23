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
    axios.get("http://localhost:8000/playerHome").then((response) => {
      setButtons(response.data);
    });
    axios.get("http://localhost:8000/playerAway").then((response) => {
      setButtonsAway(response.data);
    });
  }, []);
  const clickedButton = localStorage.getItem("clickedButton");
  const clickedButton2 = localStorage.getItem("clickedButton2");
  console.log("Clicked Button:", clickedButton);
  return (
    <>
      {/* <div className={`scoreboard`}>
        <div className="text-white">{clickedButton}</div>
        <div className={styles.goal}>
          <Image src={GoalGif} />
        </div>
        <div className="text-white text-right">{clickedButton}</div>
      </div> */}

      <div className="border border-slate-900 mt-10 p-4 rounded-md bg-[#2f2f2f] ">
        <div class="flex justify-around mt-10">
          <div className="text-white">{clickedButton2}</div>
          <div className={styles.goal}>
            <Image src={GoalGif} />
          </div>
          <div className="text-white text-right">Posisi</div>
          <div className="text-white text-right">{clickedButton}</div>
        </div>
      </div>
      {/* <div class="flex justify-around mt-8">
          <div className="text-6xl text-white text-center">
            <p className="teamAScore ml-8">{score.home}</p>
          </div>
          <div className="text-white">
            <Timer />
          </div>
          <div className="text-6xl text-white">
            <p className="teamBScore mr-10">{score.away}</p>
          </div>
        </div> */}

      <div className="text-center absolute bottom-0 w-full mb-4 text-white">
        <div className="text-center">
          <p>AFC Asian Cup</p>
        </div>
      </div>
    </>
  );
};

export default Goal;
