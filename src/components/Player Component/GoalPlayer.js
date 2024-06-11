import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Swal from "sweetalert2";

const MyComponent = () => {
  const [buttons, setButtons] = useState([]);
  const [buttonsAway, setButtonsAway] = useState([]);
  const [teamHome, setTeamHome] = useState([]);
  const [teamAway, setTeamAway] = useState([]);
  const [score, setScore] = useState(null);
  const [messageHome, setMessageHome] = useState("");
  const [minuteHome, setMinuteHome] = useState("");
  const [messageAway, setMessageAway] = useState("");
  const [minuteAway, setMinuteAway] = useState("");

  useEffect(() => {
    // Fetch button names from the API
    axios
      .get(`${process.env.NEXT_PUBLIC_DATABASE_URL}/playerHome`)
      .then((response) => {
        setButtons(response.data);
      });
    axios
      .get(`${process.env.NEXT_PUBLIC_DATABASE_URL}/playerAway`)
      .then((response) => {
        setButtonsAway(response.data);
      });
    axios
      .get(`${process.env.NEXT_PUBLIC_DATABASE_URL}/score`)
      .then((response) => {
        setScore(response.data[0]);
      });
  }, []);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const addMessage = (type) => {
    if (type === "home") {
      setScore({
        ...score,
        messagesHome: [...score.messagesHome, messageHome],
      });
      setMessageHome("");
    } else {
      setScore({
        ...score,
        messagesAway: [...score.messagesAway, messageAway],
      });
      setMessageAway("");
    }
  };

  const updateScore = () => {
    if (!score || !score.messagesHome || !score.messagesAway) {
      // Handle the case where score or its properties are null
      return;
    }

    console.log("Updated Score:", {
      ...score,
      messageHome,
      messageAway,
      minuteHome,
      minuteAway,
    });
    axios.put(`${process.env.NEXT_PUBLIC_DATABASE_URL}/score/${score._id}`, {
      ...score,
      messageHome,
      messageAway,
      minuteHome,
      minuteAway,
    });
  };

  const handleButtonClick = async (buttonData) => {
    // Show SweetAlert confirmation popup
    const result = await Swal.fire({
      title: "Confirmation",
      text: "Are you sure you want to perform this action?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    });

    // Check if the user confirmed the action
    if (result.isConfirmed) {
      localStorage.setItem("showComponent", "3");

      try {
        // Try fetching playerHome URL
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_DATABASE_URL}/playerHome/${buttonData._id}/photo`
        );

        // If successful (status code 200), use playerHome URL
        const photoUrl = `${process.env.NEXT_PUBLIC_DATABASE_URL}/playerHome/${buttonData._id}/photo`;
        localStorage.setItem("playerPhotoUrl", photoUrl);
      } catch (error) {
        // If server responds with 404 or any other error, use playerAway URL
        const photoUrl = `${process.env.NEXT_PUBLIC_DATABASE_URL}/playerAway/${buttonData._id}/photo`;
        localStorage.setItem("playerPhotoUrl", photoUrl);
      }

      localStorage.setItem("clickedButton", buttonData.name);

      // HOME
      let messagesHome = localStorage.getItem("messagesHome");
      messagesHome = messagesHome ? JSON.parse(messagesHome) : [];
      messagesHome.push(buttonData.name);
      localStorage.setItem("messagesHome", JSON.stringify(messagesHome));
      let minutesHome = localStorage.getItem("minutesHome");
      minutesHome = minutesHome ? JSON.parse(minutesHome) : [];

      // AWAY
      let messagesAway = localStorage.getItem("messagesAway");
      messagesAway = messagesAway ? JSON.parse(messagesAway) : [];

      localStorage.setItem("messagesAway", JSON.stringify(messagesAway));
      let minutesAway = localStorage.getItem("minutesAway");
      minutesAway = minutesAway ? JSON.parse(minutesAway) : [];

      const stopwatchTimeSeconds = parseInt(
        localStorage.getItem("stopwatchTime")
      );
      const newMinute = Math.floor(stopwatchTimeSeconds / 60);

      // Push the new minute to the minutesHome array
      minutesHome.push(`${newMinute}'`);

      // Save the updated minutesHome array to localStorage
      localStorage.setItem("minutesHome", JSON.stringify(minutesHome));

      try {
        // Send POST request with updated messagesHome array
        await axios.put(
          `${process.env.NEXT_PUBLIC_DATABASE_URL}/score/65b3543eba1432d9d3e02d56`,
          {
            messagesHome: messagesHome,
            minutesHome: minutesHome,
            messagesAway: messagesAway,
            minutesAway: minutesAway,
          }
        );

        console.log("Data posted successfully");
      } catch (error) {
        console.error("Error posting data:", error.message);
      }
    }
  };

  const handleButtonClickAway = async (buttonData) => {
    // Show SweetAlert confirmation popup
    const result = await Swal.fire({
      title: "Confirmation",
      text: "Are you sure you want to proceed?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    // Check if the user confirmed
    if (result.isConfirmed) {
      localStorage.setItem("showComponent", "3");

      try {
        // Try fetching playerHome URL
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_DATABASE_URL}/playerHome/${buttonData._id}/photo`
        );

        // If successful (status code 200), use playerHome URL
        const photoUrl = `${process.env.NEXT_PUBLIC_DATABASE_URL}/playerHome/${buttonData._id}/photo`;
        localStorage.setItem("playerPhotoUrl", photoUrl);
      } catch (error) {
        // If server responds with 404 or any other error, use playerAway URL
        const photoUrl = `${process.env.NEXT_PUBLIC_DATABASE_URL}/playerAway/${buttonData._id}/photo`;
        localStorage.setItem("playerPhotoUrl", photoUrl);
      }

      localStorage.setItem("clickedButton", buttonData.name);

      // HOME
      let messagesHome = localStorage.getItem("messagesHome");
      messagesHome = messagesHome ? JSON.parse(messagesHome) : [];

      localStorage.setItem("messagesHome", JSON.stringify(messagesHome));
      let minutesHome = localStorage.getItem("minutesHome");
      minutesHome = minutesHome ? JSON.parse(minutesHome) : [];

      // Retrieve existing messagesHome array or initialize an empty array
      let messagesAway = localStorage.getItem("messagesAway");
      messagesAway = messagesAway ? JSON.parse(messagesAway) : [];

      // Push the new clickedButton to the messagesAway array
      messagesAway.push(buttonData.name);

      // Save the updated messagesAway array to localStorage
      localStorage.setItem("messagesAway", JSON.stringify(messagesAway));

      // minutes
      let minutesAway = localStorage.getItem("minutesAway");
      minutesAway = minutesAway ? JSON.parse(minutesAway) : [];

      // Get stopwatchTimeSeconds and convert to minutes
      const stopwatchTimeSeconds = parseInt(
        localStorage.getItem("stopwatchTime")
      );
      const newMinute = Math.floor(stopwatchTimeSeconds / 60);

      // Push the new minute to the minutesAway array
      minutesAway.push(`${newMinute}'`);

      // Save the updated minutesAway array to localStorage
      localStorage.setItem("minutesAway", JSON.stringify(minutesAway));

      try {
        // Send POST request with updated messagesAway array
        await axios.put(
          `${process.env.NEXT_PUBLIC_DATABASE_URL}/score/65b3543eba1432d9d3e02d56`,
          {
            messagesHome: messagesHome,
            minutesHome: minutesHome,
            messagesAway: messagesAway,
            minutesAway: minutesAway,
          }
        );

        console.log("Data posted successfully");
      } catch (error) {
        console.error("Error posting data:", error.message);
      }
    }
  };

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
      <div className="container flex justify-center items-center mb-4">
        <div className="box w-full border border-gray-300">
          {teamHome.length > 0 ? (
            <div className="text-black text-xl flex justify-center items-center h-16">
              <div className="mt-auto mb-auto">
                <Image src={teamHome[0].logo} width={50} height={50} />
              </div>
              {teamHome[0].name}
            </div>
          ) : (
            <span>Loading...</span>
          )}
          <table className="buttons w-full">
            <tbody>
              {buttons.slice(0, 11).map((button) => (
                <tr
                  key={button.id}
                  className="border-b border-t border-gray-300"
                >
                  <td className="col-span-full">
                    <button
                      onClick={() => handleButtonClick(button)}
                      className="w-full py-2 px-4 bg-white text-black "
                    >
                      {button.name}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="box w-full border border-gray-300">
          {teamAway.length > 0 ? (
            <div className="text-black text-xl flex justify-center items-center h-16">
              <div className="mt-auto mb-auto">
                <Image src={teamAway[0].logo} width={50} height={50} />
              </div>
              {teamAway[0].name}
            </div>
          ) : (
            <span>Loading...</span>
          )}
          <table className="buttons w-full">
            <tbody>
              {buttonsAway.slice(0, 11).map((button) => (
                <tr
                  key={button.id}
                  className="border-b border-t border-gray-300"
                >
                  <td className="col-span-full">
                    <button
                      onClick={() => handleButtonClickAway(button)}
                      className="w-full py-2 px-4 bg-white text-black "
                    >
                      {button.name}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MyComponent;
