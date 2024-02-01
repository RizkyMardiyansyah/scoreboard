// FootballFormation.js

import React from "react";
import styles from "../styles/goal.module.css";
import yellowcard from "../assets/yellow-card.gif";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";

const YellowCard = () => {
  const [buttons, setButtons] = useState([]);
  const [buttonsAway, setButtonsAway] = useState([]);

  React.useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_DATABASE_URL}/playerHome`)
      .then((response) => {
        setButtons(response.data);
      });
    axios
      .get(`${process.env.NEXT_PUBLIC_DATABASE_URL}/playerAway`)
      .then((response) => {
        setButtonsAway(response.data);
      });
  }, []);
  const clickedButton = localStorage.getItem("clickedButton");
  console.log("Clicked Button:", clickedButton);
  const clickedButtonPhoto = localStorage.getItem("playerPhotoUrl");
  return (
    <>
      <div className=" ">
        <div class="flex justify-around mt-10">
          <div className={styles.goal}>
            <Image src={yellowcard} width={250} height={250} />
          </div>
          <div>
            <div className="text-white text-center">{clickedButton}</div>
            <Image src={clickedButtonPhoto} width={200} height={200} />
          </div>
        </div>
      </div>
    </>
  );
};

export default YellowCard;
