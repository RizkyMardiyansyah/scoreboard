import React, { useEffect, useState } from "react";
import styles from "./FootballFormation.module.css";
import axios from "axios";

const Formation4231 = ({ players }) => {
  const [playerAway, setPlayerAway] = useState([]);
  const [teamAway, setTeamAway] = useState([]);
  useEffect(() => {
    const fetchPlayerAway = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_DATABASE_URL}/playerAway`
        );
        setPlayerAway(response.data);
      } catch (error) {
        console.error("Error fetching player Away:", error);
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

      <div className="flex justify-evenly">
        <div className={styles.parentContainer}>
          <div className={styles.footballPitch}>
            <div className={`${styles.player} ${styles.goalkeeper}`}>
              <div className={styles.playerCircle}>{playerAway[0]?.no}</div>
              {playerAway.length > 0 ? (
                <span className={styles.playerName}>{playerAway[0]?.name}</span>
              ) : (
                <span>Loading...</span>
              )}
            </div>
            <div className={`${styles.player} ${styles.defender1}`}>
              <div className={styles.playerCircle}>{playerAway[1]?.no}</div>{" "}
              {playerAway.length > 0 ? (
                <span className={styles.playerName}>{playerAway[1]?.name}</span>
              ) : (
                <span>Loading...</span>
              )}
            </div>
            <div className={`${styles.player} ${styles.defender2}`}>
              <div className={styles.playerCircle}>{playerAway[2]?.no}</div>{" "}
              {playerAway.length > 0 ? (
                <span className={styles.playerName}>{playerAway[2]?.name}</span>
              ) : (
                <span>Loading...</span>
              )}
            </div>
            <div className={`${styles.player} ${styles.defender3}`}>
              <div className={styles.playerCircle}>{playerAway[3]?.no}</div>{" "}
              {playerAway.length > 0 ? (
                <span className={styles.playerName}>{playerAway[3]?.name}</span>
              ) : (
                <span>Loading...</span>
              )}
            </div>
            <div className={`${styles.player} ${styles.defender4}`}>
              <div className={styles.playerCircle}>{playerAway[4]?.no}</div>{" "}
              {playerAway.length > 0 ? (
                <span className={styles.playerName}>{playerAway[4]?.name}</span>
              ) : (
                <span>Loading...</span>
              )}
            </div>

            <div className={`${styles.player} ${styles.mid2}`}>
              <div className={styles.playerCircle}>{playerAway[5]?.no}</div>{" "}
              {playerAway.length > 0 ? (
                <span className={styles.playerName}>{playerAway[5]?.name}</span>
              ) : (
                <span>Loading...</span>
              )}
            </div>
            <div className={`${styles.player} ${styles.mid3}`}>
              <div className={styles.playerCircle}>{playerAway[6]?.no}</div>{" "}
              {playerAway.length > 0 ? (
                <span className={styles.playerName}>{playerAway[6]?.name}</span>
              ) : (
                <span>Loading...</span>
              )}
            </div>

            <div className={`${styles.player} ${styles.am1}`}>
              <div className={styles.playerCircle}>{playerAway[7]?.no}</div>{" "}
              {playerAway.length > 0 ? (
                <span className={styles.playerName}>{playerAway[7]?.name}</span>
              ) : (
                <span>Loading...</span>
              )}
            </div>

            <div className={`${styles.player} ${styles.am4}`}>
              <div className={styles.playerCircle}>{playerAway[8]?.no}</div>{" "}
              {playerAway.length > 0 ? (
                <span className={styles.playerName}>{playerAway[8]?.name}</span>
              ) : (
                <span>Loading...</span>
              )}
            </div>
            <div className={`${styles.player} ${styles.am5}`}>
              <div className={styles.playerCircle}>{playerAway[9]?.no}</div>{" "}
              {playerAway.length > 0 ? (
                <span className={styles.playerName}>{playerAway[9]?.name}</span>
              ) : (
                <span>Loading...</span>
              )}
            </div>

            <div className={`${styles.player} ${styles.striker2}`}>
              <div className={styles.playerCircle}>{playerAway[10]?.no}</div>{" "}
              {playerAway.length > 0 ? (
                <span className={styles.playerName}>
                  {playerAway[10]?.name}
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
            {playerAway.length > 0 ? (
              playerAway.slice(11).map((player, index) => (
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

export default Formation4231;
