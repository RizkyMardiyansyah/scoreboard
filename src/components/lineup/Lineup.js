import Image from "next/image";
import styles from "./FootballLineup.module.css";
import fieldImage from "@/assets/field.png"; // Import your field image

const FootballField = () => {
  return (
    <div className={styles.container}>
      <div className={styles.centered}>
        <Image src={fieldImage} height={800} width={800} />

        {/* Add player names */}
        <div
          className={styles.playerName}
          style={{ top: "373px", left: "876px" }}
        >
          <p>Player 1</p>
        </div>
        <div
          className={styles.playerName}
          style={{ top: "373px", left: "1076px" }}
        >
          <p>Player 2</p>
        </div>
      </div>
      {/* Add other player names as needed */}
    </div>
  );
};

export default FootballField;
