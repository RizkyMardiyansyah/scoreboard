import { useState, useEffect } from "react";
import axios from "axios";

const DropdownComponent = () => {
  const [teamOptions, setTeamOptions] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [homeData, setHomeData] = useState([]);

  useEffect(() => {
    // Fetch team dropdown options from the API
    axios
      .get(`${process.env.NEXT_PUBLIC_DATABASE_URL}/team`)
      .then((response) => {
        setTeamOptions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching team dropdown options:", error);
      });

    // Fetch home data from the API
    axios
      .get(`${process.env.NEXT_PUBLIC_DATABASE_URL}/awayTeam`)
      .then((response) => {
        setHomeData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching home data:", error);
      });
  }, []);

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedTeam(selectedValue);

    const selectedTeamData = teamOptions.find(
      (team) => team.name === selectedValue
    );

    if (selectedTeamData) {
      const updatedHomeData = [
        {
          name: selectedTeamData.name,
          logo: selectedTeamData.logo,
        },
      ];

      // Update the homeData state
      setHomeData(updatedHomeData);

      // Update the /home endpoint with the new data
      axios
        .put(
          `${process.env.NEXT_PUBLIC_DATABASE_URL}/awayTeam/65a4cbb0a5c2cc43008bbe79`,
          updatedHomeData[0]
        )
        .then((response) => {
          console.log(response.data.message);
        })
        .catch((error) => {
          console.error("Error updating /home endpoint:", error);
        });
    }
  };

  return (
    <div>
      <h1>Away Team</h1>
      {teamOptions.length > 0 ? (
          <select
              onChange={handleSelectChange}
              className="w-full border p-3 rounded-lg"
          >
            {homeData.map((team) => (
                <option key={team.id} value={team.name}>
                  {team.name}
                </option>
            ))}
          </select>
      ) : (
          <select
              onChange={handleSelectChange}
              className="w-full border p-3 rounded-lg"
          >
            <option value="">Select away team</option>
            {homeData.map((team) => (
                <option key={team.id} value={team.name}>
                  {team.name}
                </option>
            ))}
          </select>
      )}


      {/* <h2>Away Data</h2>
      <ul>
        {homeData.map((home) => (
          <li key={home.id}>
            {home.name} - {home.logo}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default DropdownComponent;
