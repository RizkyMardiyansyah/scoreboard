import { useState, useEffect } from "react";
import axios from "axios";

const MyComponent = () => {
  const [buttons, setButtons] = useState([]);
  const [buttonsAway, setButtonsAway] = useState([]);
  const [teamHome, setTeamHome] = useState([]);
  const [teamAway, setTeamAway] = useState([]);

  useEffect(() => {
    // Fetch button names from the API
    axios.get("http://localhost:8000/playerHome").then((response) => {
      setButtons(response.data);
    });
    axios.get("http://localhost:8000/playerAway").then((response) => {
      setButtonsAway(response.data);
    });
  }, []);

  const handleButtonClick = async (buttonData) => {
    console.log(`Button "${buttonData.no}" clicked`);
    console.log(`Button "${buttonData.name}" clicked`);

    try {
      // Try fetching playerHome URL
      const response = await axios.get(
        `http://localhost:8000/playerHome/${buttonData._id}/photo`
      );

      // If successful (status code 200), use playerHome URL
      const photoUrl = `http://localhost:8000/playerHome/${buttonData._id}/photo`;
      localStorage.setItem("playerPhotoUrl", photoUrl);
    } catch (error) {
      // If server responds with 404 or any other error, use playerAway URL
      const photoUrl = `http://localhost:8000/playerAway/${buttonData._id}/photo`;
      localStorage.setItem("playerPhotoUrl", photoUrl);
    }

    localStorage.setItem("clickedButton", buttonData.name);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/homeTeam")
      .then((response) => {
        setTeamHome(response.data);
      })
      .catch((error) => {
        console.error("Error fetching home data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/awayTeam")
      .then((response) => {
        setTeamAway(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Away data:", error);
      });
  }, []);

  console.log(teamHome);

  return (
    <>
      <div className="container">
        <div className="box">
          {teamHome.length > 0 ? (
            <h1 className="text-black text-xl text-center mt-8">
              {teamHome[0].name}
            </h1>
          ) : (
            <span>Loading...</span>
          )}
          <div className="buttons">
            {buttons.slice(0, 11).map((button) => (
              <button key={button.id} onClick={() => handleButtonClick(button)}>
                {button.name}
              </button>
            ))}
          </div>
        </div>

        <div className="box">
          {teamAway.length > 0 ? (
            <h3 className="text-black text-xl text-center mt-8">
              {teamAway[0].name}
            </h3>
          ) : (
            <span>Loading...</span>
          )}
          <div className="buttons">
            {buttonsAway.slice(0, 11).map((button) => (
              <button key={button.id} onClick={() => handleButtonClick(button)}>
                {button.name}
              </button>
            ))}
          </div>
        </div>

        <style jsx>{`
          .container {
            display: flex;
            justify-content: center;
            margin-top: 50px;
          }

          .box {
            border: 1px solid #ccc;
            padding: 10px;
            width: 300px;
          }

          .buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            margin-top: 10px;
          }

          button {
            padding: 5px 10px;
            font-size: 16px;
            cursor: pointer;
          }
        `}</style>
      </div>
    </>
  );
};

export default MyComponent;
