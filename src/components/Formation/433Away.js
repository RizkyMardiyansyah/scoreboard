import styles from "./FootballFormation.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const FootballFormationAway = () => {
  const [playerAway, setPlayerAway] = useState([]);
  const [teamAway, setTeamAway] = useState([]);

  const [team, setTeam] = useState(null);

  useEffect(() => {
    const fetchPlayerAway = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_DATABASE_URL}/playerAway`
        );
        setPlayerAway(response.data);

        const teamresponse = await axios.get(
          `${process.env.NEXT_PUBLIC_DATABASE_URL}/team`
        );
        setTeam(teamresponse.data[0]);
      } catch (error) {
        console.error("Error fetching player away:", error);
      }
    };

    fetchPlayerAway();
  }, []);
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_DATABASE_URL}/awayTeam`)
      .then((response) => {
        setTeamAway(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Away data:", error);
      });
  }, []);

  return (
    <>
      {teamAway.length > 0 ? (
        <h1 className="text-white text-3xl text-center mt-8">
          {teamAway[0].name} Lineup
        </h1>
      ) : (
        <span>Loading...</span>
      )}
      <div className={styles.parentContainer}>
        <div className={styles.footballPitch}>
          <div className={`${styles.player} ${styles.goalkeeper}`}>
            <div className={styles.playerCircle}>GK</div>

            {playerAway.length > 0 ? (
              <span className={styles.playerName}>{playerAway[0]?.name}</span>
            ) : (
              <span>Loading...</span>
            )}
          </div>

          <div className={`${styles.player} ${styles.defender1}`}>
            <div className={styles.playerCircle}>DL</div>

            {playerAway.length > 0 ? (
              <span className={styles.playerName}>{playerAway[1]?.name}</span>
            ) : (
              <span>Loading...</span>
            )}
          </div>

          <div className={`${styles.player} ${styles.defender2}`}>
            <div className={styles.playerCircle}>DC</div>

            {playerAway.length > 0 ? (
              <span className={styles.playerName}>{playerAway[2]?.name}</span>
            ) : (
              <span>Loading...</span>
            )}
          </div>

          <div className={`${styles.player} ${styles.defender3}`}>
            <div className={styles.playerCircle}>DC</div>

            {playerAway.length > 0 ? (
              <span className={styles.playerName}>{playerAway[3]?.name}</span>
            ) : (
              <span>Loading...</span>
            )}
          </div>

          <div className={`${styles.player} ${styles.defender4}`}>
            <div className={styles.playerCircle}>DR</div>

            {playerAway.length > 0 ? (
              <span className={styles.playerName}>{playerAway[4]?.name}</span>
            ) : (
              <span>Loading...</span>
            )}
          </div>

          <div className={`${styles.player} ${styles.dm5}`}>
            <div className={styles.playerCircle}>DM</div>

            {playerAway.length > 0 ? (
              <span className={styles.playerName}>{playerAway[5]?.name}</span>
            ) : (
              <span>Loading...</span>
            )}
          </div>

          <div className={`${styles.player} ${styles.mid2}`}>
            <div className={styles.playerCircle}>MC</div>

            {playerAway.length > 0 ? (
              <span className={styles.playerName}>{playerAway[6]?.name}</span>
            ) : (
              <span>Loading...</span>
            )}
          </div>

          <div className={`${styles.player} ${styles.mid3}`}>
            <div className={styles.playerCircle}>MC</div>

            {playerAway.length > 0 ? (
              <span className={styles.playerName}>{playerAway[7]?.name}</span>
            ) : (
              <span>Loading...</span>
            )}
          </div>

          <div className={`${styles.player} ${styles.am1}`}>
            <div className={styles.playerCircle}>LW</div>

            {playerAway.length > 0 ? (
              <span className={styles.playerName}>{playerAway[8]?.name}</span>
            ) : (
              <span>Loading...</span>
            )}
          </div>

          <div className={`${styles.player} ${styles.am4}`}>
            <div className={styles.playerCircle}>RW</div>

            {playerAway.length > 0 ? (
              <span className={styles.playerName}>{playerAway[9]?.name}</span>
            ) : (
              <span>Loading...</span>
            )}
          </div>

          <div className={`${styles.player} ${styles.striker2}`}>
            <div className={styles.playerCircle}>ST</div>

            {playerAway.length > 0 ? (
              <span className={styles.playerName}>{playerAway[10]?.name}</span>
            ) : (
              <span>Loading...</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FootballFormationAway;
