import SelectPlayerIn from "./SelectPlayerIn";
import SelectPlayerOut from "./SelectPlayerOut";
import { useEffect, useState } from "react";
import axios from "axios";

const Subtitution = () => {
  const [home, setHome] = useState([]);
  const [away, setAway] = useState([]);
  const [score, setScore] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/homeTeam").then((response) => {
      setHome(response.data[0]);
    });
    axios.get("http://localhost:8000/awayTeam").then((response) => {
      setAway(response.data[0]);
    });
    axios.get("http://localhost:8000/score").then((response) => {
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
      .put(`http://localhost:8000/score/${score._id}`, {
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
      <div className="bg-slate-300 flex h-screen">
        <div className="mr-3">
          <SelectPlayerIn />
        </div>
      </div>
    </>
  );
};
export default Subtitution;
