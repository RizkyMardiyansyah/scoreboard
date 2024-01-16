import { useState, useEffect } from "react";
import axios from "axios";

const MyComponent = () => {
  const [buttons, setButtons] = useState([]);
  const [buttonsAway, setButtonsAway] = useState([]);
  const [teamHome, setTeamHome] = useState([]);
  const [teamAway, setTeamAway] = useState([]);

  useEffect(() => {
    // Fetch button names from the API
    axios.get("http://localhost:5500/playerHome").then((response) => {
      setButtons(response.data);
    });
    axios.get("http://localhost:5500/playerAway").then((response) => {
      setButtonsAway(response.data);
    });
  }, []);

  const handleButtonClick = (buttonName) => {
    // Handle button click logic
    console.log(`Button "${buttonName}" clicked`);

    // Save the clicked button name to local storage
    localStorage.setItem("clickedButton", buttonName);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/home")
      .then((response) => {
        setTeamHome(response.data);
      })
      .catch((error) => {
        console.error("Error fetching home data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/away")
      .then((response) => {
        setTeamAway(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Away data:", error);
      });
  }, []);

  return (
    <>
      <div className="container">
        <div className="box">
          {teamHome.length > 0 ? (
            <h1 className="text-black text-xl text-center mt-8">
              {teamHome[0][0].name}
            </h1>
          ) : (
            <span>Loading...</span>
          )}
          <div className="buttons">
            {buttons.map((button) => (
              <button
                key={button.id}
                onClick={() => handleButtonClick(button.name)}
              >
                {button.name}
              </button>
            ))}
          </div>
        </div>

        <div className="box">
          {teamAway.length > 0 ? (
            <h3 className="text-black text-xl text-center mt-8">
              {teamAway[0][0].name}
            </h3>
          ) : (
            <span>Loading...</span>
          )}
          <div className="buttons">
            {buttonsAway.map((button) => (
              <button
                key={button.id}
                onClick={() => handleButtonClick(button.name)}
              >
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
