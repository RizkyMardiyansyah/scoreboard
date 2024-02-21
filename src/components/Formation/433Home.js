import styles from "./FootballFormation.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const FootballFormation = () => {
  const [playerHome, setPlayerHome] = useState([]);
  const [teamHome, setTeamHome] = useState([]);

  useEffect(() => {
    const fetchPlayerHome = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_DATABASE_URL}/playerHome`
        );
        setPlayerHome(response.data);
      } catch (error) {
        console.error("Error fetching player home:", error);
      }
    };

    fetchPlayerHome();
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_DATABASE_URL}/homeTeam`)
      .then((response) => {
        setTeamHome(response.data);
      })
      .catch((error) => {
        console.error("Error fetching home data:", error);
      });
  }, []);

  return (
    <>
      {teamHome.length > 0 ? (
        <h1 className="text-white text-3xl text-center mt-8">
          {teamHome[0].name} Lineup
        </h1>
      ) : (
        <span>Loading...</span>
      )}

      <div className="flex justify-evenly">
        <div className={`${styles.parentContainer}`}>
          <div className={styles.footballPitch}>
            <div className={`${styles.player} ${styles.goalkeeper}`}>
              <div className={styles.playerCircle}>{playerHome[0]?.no}</div>

              {playerHome.length > 0 ? (
                <span className={styles.playerName}>{playerHome[0]?.name}</span>
              ) : (
                <span>Loading...</span>
              )}
            </div>

            <div className={`${styles.player} ${styles.defender1}`}>
              <div className={styles.playerCircle}>{playerHome[1]?.no}</div>

              {playerHome.length > 0 ? (
                <span className={styles.playerName}>{playerHome[1]?.name}</span>
              ) : (
                <span>Loading...</span>
              )}
            </div>

            <div className={`${styles.player} ${styles.defender2}`}>
              <div className={styles.playerCircle}>{playerHome[2]?.no}</div>

              {playerHome.length > 0 ? (
                <span className={styles.playerName}>{playerHome[2]?.name}</span>
              ) : (
                <span>Loading...</span>
              )}
            </div>

            <div className={`${styles.player} ${styles.defender3}`}>
              <div className={styles.playerCircle}>{playerHome[3]?.no}</div>

              {playerHome.length > 0 ? (
                <span className={styles.playerName}>{playerHome[3]?.name}</span>
              ) : (
                <span>Loading...</span>
              )}
            </div>

            <div className={`${styles.player} ${styles.defender4}`}>
              <div className={styles.playerCircle}>{playerHome[4]?.no}</div>

              {playerHome.length > 0 ? (
                <span className={styles.playerName}>{playerHome[4]?.name}</span>
              ) : (
                <span>Loading...</span>
              )}
            </div>

            <div className={`${styles.player} ${styles.dm5}`}>
              <div className={styles.playerCircle}>{playerHome[5]?.no}</div>

              {playerHome.length > 0 ? (
                <span className={styles.playerName}>{playerHome[5]?.name}</span>
              ) : (
                <span>Loading...</span>
              )}
            </div>

            <div className={`${styles.player} ${styles.mid2}`}>
              <div className={styles.playerCircle}>{playerHome[6]?.no}</div>

              {playerHome.length > 0 ? (
                <span className={styles.playerName}>{playerHome[6]?.name}</span>
              ) : (
                <span>Loading...</span>
              )}
            </div>

            <div className={`${styles.player} ${styles.mid3}`}>
              <div className={styles.playerCircle}>{playerHome[7]?.no}</div>

              {playerHome.length > 0 ? (
                <span className={styles.playerName}>{playerHome[7]?.name}</span>
              ) : (
                <span>Loading...</span>
              )}
            </div>

            <div className={`${styles.player} ${styles.am1}`}>
              <div className={styles.playerCircle}>{playerHome[8]?.no}</div>

              {playerHome.length > 0 ? (
                <span className={styles.playerName}>{playerHome[8]?.name}</span>
              ) : (
                <span>Loading...</span>
              )}
            </div>

            <div className={`${styles.player} ${styles.am4}`}>
              <div className={styles.playerCircle}>{playerHome[9]?.no}</div>

              {playerHome.length > 0 ? (
                <span className={styles.playerName}>{playerHome[9]?.name}</span>
              ) : (
                <span>Loading...</span>
              )}
            </div>

            <div className={`${styles.player} ${styles.striker2}`}>
              <div className={styles.playerCircle}>{playerHome[10]?.no}</div>

              {playerHome.length > 0 ? (
                <span className={styles.playerName}>
                  {playerHome[10]?.name}
                </span>
              ) : (
                <span>Loading...</span>
              )}
            </div>
          </div>
        </div>

        <div className="text-white flex flex-col mt-9">
          <h1 className="text-xl">Substitutes</h1>
          <div className="text-white mt-5">
            {playerHome.length > 0 ? (
              playerHome.slice(11).map((player, index) => (
                <span key={index} className={`flex flex-col`}>
                  {player.name}
                </span>
              ))
            ) : (
              <span>Loading...</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FootballFormation;
