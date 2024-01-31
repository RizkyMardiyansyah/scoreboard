import { useState, useEffect } from "react";
import axios from "axios";

const DropdownComponent = () => {
  const [teamOptions, setTeamOptions] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("");
  const [homeData, setHomeData] = useState([]);

  useEffect(() => {
    // Fetch team dropdown options from the API
    axios
      .get("http://localhost:8000/playerHome")
      .then((response) => {
        setTeamOptions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching team dropdown options:", error);
      });

    // Fetch home data from the API
    axios
      .get("http://localhost:8000/homeTeam")
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
      console.log(updatedHomeData[0]);

      // Update the /home endpoint with the new data
      axios
        .put(
          "http://localhost:8000/homeTeam/65a4c43b781814cf4206a691",
          updatedHomeData[0]
        )
        .then((response) => {
          console.log(response.data.message);
        })
        .catch((error) => {
          console.error("Error updating", error);
        });
    }
  };

  return (
    <div>
      <h1>Player Out</h1>
      <select onChange={handleSelectChange} value={selectedTeam}>
        <option value="">Select Player Out</option>
        {teamOptions.slice(11).map((team) => (
          <option key={team.id} value={team.name}>
            {team.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownComponent;
