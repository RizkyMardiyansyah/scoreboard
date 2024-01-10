import { useState, useEffect } from "react";
import axios from "axios";

const DropdownComponent = () => {
  const [teamOptions, setTeamOptions] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [homeData, setHomeData] = useState([]);

  useEffect(() => {
    // Fetch team dropdown options from the API
    axios
      .get("http://localhost:5500/team")
      .then((response) => {
        setTeamOptions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching team dropdown options:", error);
      });

    // Fetch home data from the API
    axios
      .get("http://localhost:5500/home")
      .then((response) => {
        setHomeData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching home data:", error);
      });
  }, []);
  console.log(homeData[0]);
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
          id: 1, // Set the appropriate ID for the home data
        },
      ];

      // Update the homeData state
      setHomeData(updatedHomeData);

      // Update the /home endpoint with the new data
      axios
        .put("http://localhost:5500/home/1", updatedHomeData)
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
      <h1>Home Team</h1>
      <select onChange={handleSelectChange}>
        <option value="">Select home team</option>
        {teamOptions.map((team) => (
          <option key={team.id} value={team.name}>
            {team.name}
          </option>
        ))}
      </select>

      <h2>Home Data</h2>
      <ul>
        {homeData.map((home) => (
          <li key={home.id}>
            {home.name} - {home.logo}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownComponent;
