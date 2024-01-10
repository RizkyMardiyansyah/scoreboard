import styles from "./FootballFormation.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const FootballFormation = () => {
  const [playerHome, setPlayerHome] = useState([]);
  const [playerAway, setPlayerAway] = useState([]);

  useEffect(() => {
    const fetchPlayerHome = async () => {
      try {
        const response = await axios.get("http://localhost:5500/playerHome");
        setPlayerHome(response.data);
      } catch (error) {
        console.error("Error fetching player home:", error);
      }
    };

    fetchPlayerHome();
  }, []);

  // console.log(team.home);

  useEffect(() => {
    const fetchPlayerAway = async () => {
      try {
        const response = await axios.get("http://localhost:5500/playerAway");
        setPlayerAway(response.data);
      } catch (error) {
        console.error("Error fetching player home:", error);
      }
    };

    fetchPlayerAway();
  }, []);
  // console.log(playerHome);
  return (
    <>
      {playerHome.length > 0 ? (
        <h1 className="text-white text-3xl text-center mt-8">
          Arsenal Formation
        </h1>
      ) : (
        <span>Loading...</span>
      )}

      <div className={styles.parentContainer}>
        <div className={styles.footballPitch}>
          <div className={`${styles.player} ${styles.goalkeeper}`}>
            <div className={styles.playerCircle}>GK</div>

            {playerHome.length > 0 ? (
              <span className={styles.playerName}>{playerHome[0]?.name}</span>
            ) : (
              <span>Loading...</span>
            )}
          </div>

          <div className={`${styles.player} ${styles.defender1}`}>
            <div className={styles.playerCircle}>Def</div>

            {playerHome.length > 0 ? (
              <span className={styles.playerName}>{playerHome[1]?.name}</span>
            ) : (
              <span>Loading...</span>
            )}
          </div>

          <div className={`${styles.player} ${styles.defender2}`}>
            <div className={styles.playerCircle}>Def</div>

            {playerHome.length > 0 ? (
              <span className={styles.playerName}>{playerHome[2]?.name}</span>
            ) : (
              <span>Loading...</span>
            )}
          </div>

          <div className={`${styles.player} ${styles.defender3}`}>
            <div className={styles.playerCircle}>Def</div>

            {playerHome.length > 0 ? (
              <span className={styles.playerName}>{playerHome[3]?.name}</span>
            ) : (
              <span>Loading...</span>
            )}
          </div>

          <div className={`${styles.player} ${styles.defender4}`}>
            <div className={styles.playerCircle}>Def</div>

            {playerHome.length > 0 ? (
              <span className={styles.playerName}>{playerHome[4]?.name}</span>
            ) : (
              <span>Loading...</span>
            )}
          </div>

          <div className={`${styles.player} ${styles.dm5}`}>
            <div className={styles.playerCircle}>MID</div>

            {playerHome.length > 0 ? (
              <span className={styles.playerName}>{playerHome[5]?.name}</span>
            ) : (
              <span>Loading...</span>
            )}
          </div>

          <div className={`${styles.player} ${styles.mid2}`}>
            <div className={styles.playerCircle}>MID</div>

            {playerHome.length > 0 ? (
              <span className={styles.playerName}>{playerHome[6]?.name}</span>
            ) : (
              <span>Loading...</span>
            )}
          </div>

          <div className={`${styles.player} ${styles.mid3}`}>
            <div className={styles.playerCircle}>MID</div>

            {playerHome.length > 0 ? (
              <span className={styles.playerName}>{playerHome[7]?.name}</span>
            ) : (
              <span>Loading...</span>
            )}
          </div>

          <div className={`${styles.player} ${styles.am1}`}>
            <div className={styles.playerCircle}>MID</div>

            {playerHome.length > 0 ? (
              <span className={styles.playerName}>{playerHome[8]?.name}</span>
            ) : (
              <span>Loading...</span>
            )}
          </div>

          <div className={`${styles.player} ${styles.am4}`}>
            <div className={styles.playerCircle}>ST</div>

            {playerHome.length > 0 ? (
              <span className={styles.playerName}>{playerHome[9]?.name}</span>
            ) : (
              <span>Loading...</span>
            )}
          </div>

          <div className={`${styles.player} ${styles.striker2}`}>
            <div className={styles.playerCircle}>ST</div>

            {playerHome.length > 0 ? (
              <span className={styles.playerName}>{playerHome[10]?.name}</span>
            ) : (
              <span>Loading...</span>
            )}
          </div>
        </div>
      </div>

      {/* <div className={styles.parentContainer}>
        <div className={styles.footballPitch}>
          <div className={`${styles.player} ${styles.goalkeeper}`}>
            <div className={styles.playerCircle}>GK</div>

            {playerHome.length > 0 ? (
              <span className={styles.playerName}>{playerHome[0]?.name}</span>
            ) : (
              <span>Loading...</span>
            )}
          </div>

          <div className={`${styles.player} ${styles.defender1}`}>
            <div className={styles.playerCircle}>Def</div>

            {playerHome.length > 0 ? (
              <span className={styles.playerName}>{playerHome[1]?.name}</span>
            ) : (
              <span>Loading...</span>
            )}
          </div>

          <div className={`${styles.player} ${styles.defender2}`}>
            <div className={styles.playerCircle}>Def</div>

            {playerHome.length > 0 ? (
              <span className={styles.playerName}>{playerHome[2]?.name}</span>
            ) : (
              <span>Loading...</span>
            )}
          </div>

          <div className={`${styles.player} ${styles.defender3}`}>
            <div className={styles.playerCircle}>Def</div>

            {playerHome.length > 0 ? (
              <span className={styles.playerName}>{playerHome[3]?.name}</span>
            ) : (
              <span>Loading...</span>
            )}
          </div>

          <div className={`${styles.player} ${styles.defender4}`}>
            <div className={styles.playerCircle}>Def</div>

            {playerHome.length > 0 ? (
              <span className={styles.playerName}>{playerHome[4]?.name}</span>
            ) : (
              <span>Loading...</span>
            )}
          </div>

          <div className={`${styles.player} ${styles.midfielder1}`}>
            <div className={styles.playerCircle}>MID</div>

            {playerHome.length > 0 ? (
              <span className={styles.playerName}>{playerHome[5]?.name}</span>
            ) : (
              <span>Loading...</span>
            )}
          </div>

          <div className={`${styles.player} ${styles.midfielder2}`}>
            <div className={styles.playerCircle}>MID</div>

            {playerHome.length > 0 ? (
              <span className={styles.playerName}>{playerHome[6]?.name}</span>
            ) : (
              <span>Loading...</span>
            )}
          </div>

          <div className={`${styles.player} ${styles.midfielder3}`}>
            <div className={styles.playerCircle}>MID</div>

            {playerHome.length > 0 ? (
              <span className={styles.playerName}>{playerHome[7]?.name}</span>
            ) : (
              <span>Loading...</span>
            )}
          </div>

          <div className={`${styles.player} ${styles.midfielder4}`}>
            <div className={styles.playerCircle}>MID</div>

            {playerHome.length > 0 ? (
              <span className={styles.playerName}>{playerHome[8]?.name}</span>
            ) : (
              <span>Loading...</span>
            )}
          </div>

          <div className={`${styles.player} ${styles.striker1}`}>
            <div className={styles.playerCircle}>ST</div>

            {playerHome.length > 0 ? (
              <span className={styles.playerName}>{playerHome[9]?.name}</span>
            ) : (
              <span>Loading...</span>
            )}
          </div>

          <div className={`${styles.player} ${styles.striker2}`}>
            <div className={styles.playerCircle}>ST</div>

            {playerHome.length > 0 ? (
              <span className={styles.playerName}>{playerHome[10]?.name}</span>
            ) : (
              <span>Loading...</span>
            )}
          </div>
        </div>
      </div> */}
    </>
  );
};

export default FootballFormation;
