import React from "react";
import styles from "@/styles/goal.module.css";
import yellowcard from "@/assets/yellow-card.gif";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import GoalGif from "@/assets/futuboalhafoari.gif";
import { pauseStopwatch } from "@/redux/slices/stopwatchSlice";

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
  const clickedButtonPhoto = localStorage.getItem("playerPhotoUrl");
  const clickedButtonPhotoAway = localStorage.getItem("playerPhotoUrlAway");
  console.log("Clicked Button:", clickedButton);
  return (
    <>
      <div className=" ">
        <div class="flex justify-around mt-10">
          <div className={styles.goal}>
            <Image src={GoalGif} width={500} height={500} />
          </div>
          <div>
            <div className="text-white text-center">{clickedButton}</div>
            <Image src={clickedButtonPhoto} width={200} height={200} />
          </div>
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
    </>
  );
};

export default Goal;
