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
            <Image
                        key={player.photo ? player.photo : "default"}
                        src={`${
                          process.env.NEXT_PUBLIC_DATABASE_URL
                        }/playerAway/${player._id}/photo?${Math.random()}`}
                        alt={`Player ${player.name}`}
                        width={45}
                        height={45}
                        className="flex items-center justify-center"
                      />
          </div>
        </div>
      </div>
    </>
  );
};

export default Goal;
