// FootballFormation.js

import React from "react";
import styles from "@/styles/goal.module.css";
import yellowcard from "@/assets/yellow-card.gif";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";

const YellowCard = () => {
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
  console.log("Clicked Button:", clickedButton);
  const clickedButton2 = localStorage.getItem("clickedButton2");
  return (
    <>
      {/* <div className={`scoreboard`}>
      <div className="text-white">{clickedButton}</div>
      <div className={styles.goal}>
        <Image src={yellowcard} />
      </div>
      <div className="text-white text-right">{clickedButton}</div>
    </div> */}

      <div className="border border-slate-900 mt-10 p-4 rounded-md bg-[#2f2f2f] ">
        <div class="flex justify-around mt-10">
          <div className="text-white">{clickedButton2}</div>
          <div className={styles.goal}>
            <Image src={yellowcard} />
          </div>
          <div className="text-white text-right">Posisi</div>
          <div className="text-white text-right">{clickedButton}</div>
        </div>
      </div>
    </>
  );
};

export default YellowCard;
