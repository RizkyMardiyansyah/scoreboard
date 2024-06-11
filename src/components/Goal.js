import React from "react";
import styles from "../styles/goal.module.css";
import Image from "next/image";
import GoalGif from "../assets/futuboalhafoari.gif";

const Goal = () => {
  const clickedButton = localStorage.getItem("clickedButton");
  const clickedButtonPhoto = localStorage.getItem("playerPhotoUrl");
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
    </>
  );
};

export default Goal;
