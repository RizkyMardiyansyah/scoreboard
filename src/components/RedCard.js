// FootballFormation.js

import React from "react";
import styles from "@/styles/goal.module.css";
import redCard from "@/assets/red-card.gif";
import Image from "next/image";

const RedCard = () => {
  const clickedButton = localStorage.getItem("clickedButton");
  const clickedButton2 = localStorage.getItem("clickedButton2");
  console.log("Clicked Button:", clickedButton);
  return (
    <>
      {/* <div className={`scoreboard`}>
      <div className="text-white">{clickedButton}</div>
      <div className={styles.goal}>
        <Image src={redCard} />
      </div>
      <div className="text-white text-right">{clickedButton}</div>
    </div> */}

      <div className="border border-slate-900 mt-10 p-4 rounded-md bg-[#2f2f2f] ">
        <div class="flex justify-around mt-10">
          <div className="text-white">{clickedButton2}</div>
          <div className={styles.goal}>
            <Image src={redCard} />
          </div>
          <div className="text-white text-right">Posisi</div>
          <div className="text-white text-right">{clickedButton}</div>
        </div>
      </div>
    </>
  );
};

export default RedCard;
