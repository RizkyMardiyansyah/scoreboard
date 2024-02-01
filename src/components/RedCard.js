// FootballFormation.js

import React from "react";
import styles from "../styles/goal.module.css";
import redCard from "../assets/red-card.gif";
import Image from "next/image";

const RedCard = () => {
  const clickedButton = localStorage.getItem("clickedButton");
  const clickedButtonPhoto = localStorage.getItem("playerPhotoUrl");
  console.log("Clicked Button:", clickedButton);
  return (
    <>
      <div className=" ">
        <div class="flex justify-around mt-10">
          <div className={styles.goal}>
            <Image src={redCard} width={250} height={250} />
          </div>
          <div>
            <div className="text-white text-center">{clickedButton}</div>
            <Image src={clickedButtonPhoto} width={250} height={250} />
          </div>
        </div>
      </div>
    </>
  );
};

export default RedCard;
