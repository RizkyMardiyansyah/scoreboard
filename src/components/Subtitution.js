import SelectPlayerIn from "./SelectPlayerIn";
import SelectPlayerInAway from "./SelectPlayerInAway";
import { useEffect, useState } from "react";
import axios from "axios";

const Subtitution = () => {
  const [home, setHome] = useState([]);
  const [away, setAway] = useState([]);
  const [score, setScore] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_DATABASE_URL}/homeTeam`)
      .then((response) => {
        setHome(response.data[0]);
      });
    axios
      .get(`${process.env.NEXT_PUBLIC_DATABASE_URL}/awayTeam`)
      .then((response) => {
        setAway(response.data[0]);
      });
    axios
      .get(`${process.env.NEXT_PUBLIC_DATABASE_URL}/score`)
      .then((response) => {
        setScore(response.data[0]);
      });
  }, []);

  const updateScore = () => {
    if (!score || !score.messagesHome || !score.messagesAway) {
      // Handle the case where score or its properties are null
      return;
    }

    console.log("Updated Score:", { ...score, messageHome, messageAway });
    axios
      .put(`${process.env.NEXT_PUBLIC_DATABASE_URL}/score/${score._id}`, {
        ...score,
        messageHome,
        messageAway,
      })
      .then((response) => {
        Swal.fire({
          title: `Score updated successfully!`,
          icon: "success",
        });
      });
  };
  return (
    <>
      <div className="border border-black mt-5 ml-9 mr-9 rounded-xl">
        <div className="bg-neutral-300 p-4 rounded-xl">
          <SelectPlayerIn />
        </div>
      </div>
      <div className="border border-black mt-5 mb-5 ml-9 mr-9 rounded-xl">
        <div className="bg-neutral-300 p-4 rounded-xl">
          <SelectPlayerInAway />
        </div>
      </div>
    </>
  );
};
export default Subtitution;
