import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

const MyComponent = () => {
  const [buttons, setButtons] = useState([]);
  const [buttonsAway, setButtonsAway] = useState([]);
  const [teamHome, setTeamHome] = useState([]);
  const [teamAway, setTeamAway] = useState([]);

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
  }, []);

  const handleButtonClick = async (buttonData) => {
    localStorage.setItem("showComponent", "5");
    console.log(`Button "${buttonData.no}" clicked`);
    console.log(`Button "${buttonData.name}" clicked`);

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

  console.log(teamHome);

  return (
    <>
      <div className="container flex justify-center items-center mb-4">
        <div className="box w-full border border-gray-300">
          {teamHome.length > 0 ? (
            <div className="text-black text-xl flex justify-center items-center h-16">
              <div className="mt-auto mb-auto">
                <img src={teamHome[0].logo} width={50} height={50} />
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
                <img src={teamAway[0].logo} width={50} height={50} />
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
      </div>
    </>
  );
};

export default MyComponent;
