// Inside your Next.js component

import React from "react";
import Formation4231 from "@/components/Formation/4231Home";
import styles from "@/components/Formation/FootballFormation.module.css";

const MyComponent = () => {
  const buttonClickHandler = (buttonNumber) => {
    // Handle button click
    console.log(`Button ${buttonNumber} clicked`);
  };

  return (
    <>
      <Formation4231 />
      {/* <div className="container">
        <div className="box">
          <h2>Home</h2>
          <div className="buttons">
            {[...Array(11)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => buttonClickHandler(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="box">
          <h2>Away</h2>
          <div className="buttons">
            {[...Array(11)].map((_, index) => (
              <button
                key={index + 12}
                onClick={() => buttonClickHandler(index + 12)}
              >
                {index + 12}
              </button>
            ))}
          </div>
        </div>

        <style jsx>{`
          .container {
            display: flex;
            justify-content: space-around;
            margin-top: 50px;
          }

          .box {
            border: 1px solid #ccc;
            padding: 10px;
            width: 200px;
          }

          .buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
          }

          button {
            padding: 5px 10px;
            margin: 5px;
            font-size: 16px;
            cursor: pointer;
          }
        `}</style>
      </div> */}
    </>
  );
};

export default MyComponent;
