import { useState, useEffect } from "react";
import axios from "axios";

const MyComponent = () => {
  const [buttons, setButtons] = useState([]);
  const [buttonsAway, setButtonsAway] = useState([]);

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

  return (
    <>
      <div className="container">
        <div className="box">
          <h2>Buttons</h2>
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
          <h2>Buttons</h2>
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
