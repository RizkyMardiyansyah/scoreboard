// FootballFormation.js

import React from "react";
import styles from "@/styles/goal.module.css";
import redCard from "@/assets/red-card.gif";
import Image from "next/image";

const RedCard = () => {
  const clickedButton = localStorage.getItem("clickedButton");
  console.log("Clicked Button:", clickedButton);
  return (
    <div className={`scoreboard`}>
      <div className="text-white">{clickedButton}</div>
      <div className={styles.goal}>
        <Image src={redCard} />
      </div>
      <div className="text-white text-right">{clickedButton}</div>
    </div>
  );
};

export default RedCard;
